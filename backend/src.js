import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pg from 'pg'
import { z } from 'zod'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import compression from 'compression'

const { Pool } = pg
const app = express()
const port = Number(process.env.PORT || 4000)
if (process.env.TRUST_PROXY === '1') app.set('trust proxy', 1)
const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
  max: Number(process.env.DB_POOL_SIZE || 10),
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
  statement_timeout: 8_000,
  keepAlive: true,
}) : null
pool?.on('error', err => console.error('Unexpected idle PostgreSQL connection error:', err.message))
const schema = z.object({
  name: z.string().trim().min(1).max(100),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().trim().min(1).max(20),
  members: z.coerce.number().int().min(1).max(30),
  note: z.string().trim().max(500).optional().default(''),
})
const mediaSchema = z.object({
  title: z.string().trim().min(1).max(160),
  image_url: z.string().url().max(2048),
  category: z.string().trim().max(100).optional().default('From the kitchen'),
  media_type: z.enum(['image', 'video']).default('image'),
})
const heroSchema = z.object({
  title: z.string().trim().min(1).max(160),
  media_url: z.string().url().max(2048),
  media_type: z.enum(['image', 'video']).default('image'),
})
const settingsSchema = z.object({ whatsappPhone: z.string().trim().max(40).regex(/^\+?[\d\s()-]*$/) })

app.disable('x-powered-by')
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: { directives: {
    defaultSrc: ["'self'"], scriptSrc: ["'self'"], styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    fontSrc: ['https://fonts.gstatic.com'], imgSrc: ["'self'", 'data:', 'https:'], mediaSrc: ["'self'", 'https:'],
    frameSrc: ['https://maps.google.com', 'https://www.google.com'], connectSrc: ["'self'"],
  } },
}))
app.use(compression())
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean)
app.use(cors({ origin: (origin, callback) => callback(null, !origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) }))
app.use(express.json({ limit: '24kb' }))
app.use('/api', (req, res, next) => {
  res.setHeader('Cache-Control', req.path.startsWith('/content') ? 'public, max-age=30, stale-while-revalidate=120' : 'no-store')
  next()
})
const rateBuckets = new Map()
const bucketCleanup = setInterval(() => {
  const cutoff = Date.now() - 60_000
  for (const [key, bucket] of rateBuckets) if (bucket.start < cutoff) rateBuckets.delete(key)
}, 5 * 60_000)
bucketCleanup.unref()
app.use('/api', (req, res, next) => {
  const now = Date.now(), key = `${req.ip}:${req.method === 'POST' && req.path === '/reservations' ? 'reservation' : req.path}`
  const bucket = rateBuckets.get(key) || { start: now, count: 0 }
  if (now - bucket.start > 60_000) { bucket.start = now; bucket.count = 0 }
  bucket.count++; rateBuckets.set(key, bucket)
  const limit = req.path === '/reservations' ? 8 : req.path === '/admin/login' ? 8 : 120
  if (bucket.count > limit) return res.status(429).json({ error: 'Too many requests. Please try again shortly.' })
  next()
})

const unavailable = (_req, res) => res.status(503).json({ error: 'The database is not configured. Add DATABASE_URL to backend/.env.' })
const transient = e => ['ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED', '57P01', '08006', '08001'].includes(e.code) || /timeout|terminat/i.test(e.message || '')
// Neon's free compute sleeps when idle, so retry once while it wakes up.
const query = async (sql, values) => {
  if (!pool) throw Object.assign(new Error('Database unavailable'), { status: 503 })
  try { return await pool.query(sql, values) }
  catch (e) { if (!transient(e)) throw e; await new Promise(r => setTimeout(r, 600)); return pool.query(sql, values) }
}
const SELECT_GALLERY = 'SELECT id, title, image_url, category, media_type FROM gallery_items ORDER BY sort_order, created_at DESC'
const SELECT_HERO = 'SELECT id, title, media_url, media_type FROM hero_media ORDER BY sort_order, created_at DESC'
async function loadContent() {
  const [gallery, hero, setting] = await Promise.all([query(SELECT_GALLERY), query(SELECT_HERO), query("SELECT setting_value FROM site_settings WHERE setting_key = 'whatsapp_phone'")])
  return { gallery: gallery.rows, heroMedia: hero.rows, whatsappPhone: setting.rows[0]?.setting_value || process.env.WHATSAPP_PHONE || '' }
}
// Public content is cached in memory, so thousands of visitors cost the free database one read every 30 seconds.
// If the database is briefly unreachable, the last good copy keeps being served.
let cache = { at: 0, data: null, inflight: null }
function getContent() {
  if (cache.data && Date.now() - cache.at < 30_000) return Promise.resolve(cache.data)
  if (!cache.inflight) cache.inflight = loadContent()
    .then(data => { cache = { at: Date.now(), data, inflight: null }; return data })
    .catch(err => { cache.inflight = null; if (cache.data) return cache.data; throw err })
  return cache.inflight
}
const bust = () => { cache = { at: 0, data: cache.data, inflight: null } }
const defaultGallery = [
  ['House special chicken biryani', 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=1300&q=85', 'Biryani'],
  ['A table set for sharing', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1100&q=85', 'From the kitchen'],
  ['Golden, flaky parotta', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1100&q=85', 'South Indian'],
  ['Slow-cooked, full of flavour', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1100&q=85', 'From the kitchen'],
  ['A little something sweet', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1100&q=85', 'Something sweet'],
]
// First run only: put the starter gallery into the database so the admin can edit or delete every photo.
async function seedDefaults() {
  const { rows } = await pool.query('SELECT 1 FROM gallery_items LIMIT 1')
  if (rows.length) return
  for (const [i, [title, url, category]] of defaultGallery.entries()) await pool.query('INSERT INTO gallery_items (title, image_url, category, sort_order) VALUES ($1,$2,$3,$4)', [title, url, category, i])
}
const asyncRoute = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
const tokenSecret = process.env.ADMIN_TOKEN_SECRET || process.env.ADMIN_PASSWORD
const signature = text => createHmac('sha256', tokenSecret || 'development-secret-must-be-configured').update(text).digest('base64url')
function createToken() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + 8 * 60 * 60 * 1000, scope: 'admin' })).toString('base64url')
  return `${payload}.${signature(payload)}`
}
function isAdmin(req, res, next) {
  const value = req.headers.authorization?.replace(/^Bearer\s+/i, '') || ''
  const [payload, supplied] = value.split('.')
  if (!payload || !supplied || !tokenSecret) return res.status(401).json({ error: 'Please sign in again.' })
  const expected = signature(payload)
  const a = Buffer.from(supplied), b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return res.status(401).json({ error: 'Please sign in again.' })
  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (decoded.exp < Date.now() || decoded.scope !== 'admin') throw new Error('expired')
  } catch { return res.status(401).json({ error: 'Your sign-in has expired.' }) }
  next()
}
async function initializeDb() {
  if (!pool) return
  await pool.query(await readFile(new URL('./schema.sql', import.meta.url), 'utf8'))
  await seedDefaults()
}

app.get('/api/health', asyncRoute(async (_req, res) => {
  if (!pool) return res.status(503).json({ ok: false, database: 'not_configured' })
  await pool.query('SELECT 1')
  res.json({ ok: true, database: 'connected' })
}))
app.get('/api/content', asyncRoute(async (_req, res) => { res.json(await getContent()) }))
app.post('/api/reservations', asyncRoute(async (req, res) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Please check your name, date, time, guest count, and note.' })
  const { name, date, time, members, note } = parsed.data
  if (date < new Date().toISOString().slice(0, 10)) return res.status(400).json({ error: 'Please choose today or a future date.' })
  const result = await query('INSERT INTO reservations (name, reservation_date, reservation_time, members, note) VALUES ($1, $2, $3, $4, $5) RETURNING id', [name, date, time, members, note])
  res.status(201).json({ ok: true, id: result.rows[0].id })
}))
app.post('/api/admin/login', (req, res) => {
  const password = process.env.ADMIN_PASSWORD || ''
  const submitted = String(req.body?.password || '')
  if (!password) return res.status(503).json({ error: 'Set ADMIN_PASSWORD in backend/.env before signing in.' })
  const a = Buffer.from(submitted), b = Buffer.from(password)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return res.status(401).json({ error: 'That password did not match.' })
  res.json({ token: createToken() })
})
app.get('/api/admin/content', isAdmin, asyncRoute(async (_req, res) => { res.json(await loadContent()) }))
app.get('/api/admin/reservations', isAdmin, asyncRoute(async (_req, res) => {
  const result = await query("SELECT id, name, to_char(reservation_date, 'YYYY-MM-DD') AS date, reservation_time AS time, members, note, created_at FROM reservations ORDER BY reservation_date DESC, created_at DESC LIMIT 200")
  res.json({ reservations: result.rows })
}))
app.delete('/api/admin/reservations/:id', isAdmin, asyncRoute(async (req, res) => {
  const result = await query('DELETE FROM reservations WHERE id = $1 RETURNING id', [req.params.id])
  if (!result.rowCount) return res.status(404).json({ error: 'Booking not found.' })
  res.json({ ok: true })
}))
app.post('/api/admin/gallery', isAdmin, asyncRoute(async (req, res) => {
  const parsed = mediaSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Add a valid title and public media URL.' })
  const { title, image_url, category, media_type } = parsed.data
  const result = await query('INSERT INTO gallery_items (title, image_url, category, media_type) VALUES ($1,$2,$3,$4) RETURNING id', [title, image_url, category, media_type])
  bust()
  res.status(201).json({ ok: true, id: result.rows[0].id })
}))
app.delete('/api/admin/gallery/:id', isAdmin, asyncRoute(async (req, res) => {
  const result = await query('DELETE FROM gallery_items WHERE id = $1 RETURNING id', [req.params.id])
  if (!result.rowCount) return res.status(404).json({ error: 'Gallery item not found.' })
  bust()
  res.json({ ok: true })
}))
app.post('/api/admin/hero-media', isAdmin, asyncRoute(async (req, res) => {
  const parsed = heroSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Add a valid title and public media URL.' })
  const { title, media_url, media_type } = parsed.data
  const result = await query('INSERT INTO hero_media (title, media_url, media_type) VALUES ($1,$2,$3) RETURNING id', [title, media_url, media_type])
  bust()
  res.status(201).json({ ok: true, id: result.rows[0].id })
}))
app.delete('/api/admin/hero-media/:id', isAdmin, asyncRoute(async (req, res) => {
  const result = await query('DELETE FROM hero_media WHERE id = $1 RETURNING id', [req.params.id])
  if (!result.rowCount) return res.status(404).json({ error: 'Home media item not found.' })
  bust()
  res.json({ ok: true })
}))
app.put('/api/admin/settings', isAdmin, asyncRoute(async (req, res) => {
  const parsed = settingsSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Enter a WhatsApp number with country code.' })
  const { whatsappPhone } = parsed.data
  await query("INSERT INTO site_settings (setting_key, setting_value) VALUES ('whatsapp_phone',$1) ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value", [whatsappPhone])
  bust()
  res.json({ ok: true })
}))
const dist = fileURLToPath(new URL('../frontend/dist', import.meta.url))
if (existsSync(dist)) {
  app.use(express.static(dist, { maxAge: '7d', setHeaders: (res, file) => { if (file.endsWith('index.html')) res.setHeader('Cache-Control', 'no-cache') } }))
  app.get(/^\/(?!api\/).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}
app.use((err, _req, res, _next) => {
  console.error(err.message)
  if (err.status === 503 || err.code === 'ECONNREFUSED') return res.status(503).json({ error: 'The reservation service is temporarily unavailable. Please try WhatsApp directly.' })
  if (err.code === '22P02') return res.status(400).json({ error: 'That media ID is invalid.' })
  res.status(500).json({ error: 'Something went wrong. Please try again.' })
})

if (!pool) console.warn('DATABASE_URL is not configured. Public content loads as a preview; reservations and admin changes need Neon.')
const start = async () => {
  if (pool) {
    try { await initializeDb(); console.log('Neon schema is ready.') }
    catch (err) { console.error('Could not initialize database:', err.message); process.exit(1) }
  }
  app.listen(port, () => console.log(`The Chennai Kitchen API listening on port ${port}`))
}
start()
process.on('unhandledRejection', err => console.error('Unhandled rejection:', err?.message || err))
process.on('SIGTERM', async () => { await pool?.end(); process.exit(0) })
