# UMANG Hospital API (NestJS)

Backend for the admin dashboard: blogs and contact messages. Uses **MongoDB** with Mongoose (no Prisma).

## Setup

```bash
npm install
cp .env.example .env
# Edit .env: DATABASE_URL (MongoDB connection string), PORT (default 4000)
npm run build
```

## Run

```bash
# Development (watch mode)
npm run start:dev

# Production
npm run start:prod
```

API runs at `http://localhost:4000` by default. The Next.js app uses `NEXT_PUBLIC_API_URL` (default `http://localhost:4000` when running locally).

## Endpoints

- `GET/POST /blogs` – list (optional `?published=true`) / create
- `GET/PATCH/DELETE /blogs/:id` – get / update / delete
- `GET /blogs/slug/:slug` – get by slug (public)
- `GET/POST /messages` – list / create (contact form)
- `GET/PATCH/DELETE /messages/:id` – get / mark read / delete
- `PATCH /messages/:id/read` – mark as read

## Database

MongoDB via Mongoose. Set `DATABASE_URL` in `.env`:

- **Local:** `mongodb://localhost:27017/umang_hospital`
- **Atlas:** `mongodb+srv://user:password@cluster.mongodb.net/umang_hospital`

Collections are created automatically when you first insert data. No migrations or Prisma.

---

## Frontend–backend connection

| Frontend (Next.js) | Backend (NestJS) | Notes |
|--------------------|------------------|--------|
| `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`) | `PORT` (default 4000), `CORS_ORIGIN` (default `http://localhost:3000`) | Same host/port; CORS allows the Next app origin. |
| `getBlogs(false)` → `GET /blogs?published=false` | `GET /blogs?published=` | Dashboard & admin list use unpublished. |
| `getBlog(id)` → `GET /blogs/:id` | `GET /blogs/:id` | Edit blog. |
| `createBlog(data)` → `POST /blogs` | `POST /blogs` | Body: title, slug, excerpt?, body, published?. |
| `updateBlog(id, data)` → `PATCH /blogs/:id` | `PATCH /blogs/:id` | Partial body. |
| `deleteBlog(id)` → `DELETE /blogs/:id` | `DELETE /blogs/:id` | — |
| `getMessages()` → `GET /messages` | `GET /messages` | Admin messages list. |
| `markMessageRead(id)` → `PATCH /messages/:id/read` | `PATCH /messages/:id/read` | — |
| `deleteMessage(id)` → `DELETE /messages/:id` | `DELETE /messages/:id` | — |
| Contact form `submitMessage({ name, email, description })` → `POST /messages` | `POST /messages` | Same body; fallback to mailto if API fails. |

Admin flow: `/admin` → redirect to `/admin/dashboard`; `/admin/login` (no cookie) → login; cookie set → access dashboard, blogs, messages. Logout POSTs to `/api/admin/logout` and redirects to `/admin/login`.
