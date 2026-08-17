# Circlely — Premium Community & Social Connection Platform

Tagline: **"Find Your People. Build Your Circle."**

Circlely is a complete, production-ready adult community platform inspired by top social connection websites. It empowers members to discover interest circles, participate in group activities and events, make authentic adult friendships, chat safely, and maintain strict privacy.

---

## Key Features

### Public Marketing Experience
- **Hero & Trust Strip**: Interactive activity showcase cards and configurable live statistics counter (10K+ Members, 120+ Communities, 500+ Activities, 50+ Cities).
- **Find Your Circle Preview**: Filter communities by interest, age bracket, and activity.
- **Age-Based & Interest Discovery**: 5 age brackets (18–24, 25–34, 35–49, 50–64, 65+) alongside pure interest-based discovery.
- **Informational Pages**: About, How It Works, Safety Center, FAQs, Contact Form, Terms, Privacy Policy, Community Guidelines.

### Authenticated App Experience
- **Guided 6-Step Onboarding**: Profile bio & avatar -> Interests selection -> Circle pick -> Location -> Privacy preferences -> Custom recommendation feed.
- **Community Feed & Detail**: Text, image, poll creation, likes, comments drawer, bookmarking, and 1-click safety reporting.
- **Discover People**: Find adult members by shared hobbies, age range, city, and send connection requests.
- **Activities & Events**: Join group hangouts, RSVP for virtual/physical events with attendee rosters.
- **Private Messaging**: Direct messaging with conversation list, active indicators, and block user safety modal.
- **Notifications System**: Real-time alerts for connections, comments, likes, event updates, and moderation actions.
- **Settings & Privacy**: Granular visibility controls, JSON data export, and permanent account deletion.

### Admin Control Center
- **Metrics Dashboard & Charts**: Visual Recharts growth graphs for active members and feed engagement trends.
- **User Management**: Search users, toggle verification badges, suspend/activate accounts.
- **Community Management**: Inspect and manage communities and moderator assignments.
- **Moderation Queue**: Review reported posts, comments, events, and messages with action/dismiss logs.
- **Audit Logs & Contact Requests**: System event trail and contact form submissions viewer.

---

## Tech Stack

- **Frontend**: Next.js 14/15 App Router, React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Recharts.
- **Backend & Database**: Next.js API Routes, Prisma ORM, SQLite (local zero-config) / PostgreSQL (production deployable).
- **Authentication**: JWT Cookies, bcryptjs password hashing, role-based authorization (USER, MODERATOR, ADMIN).
- **Validation**: Zod schema validation.

---

## Environment Variables

Copy `.env.example` to `.env`:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="circlely-super-secret-production-key-2026"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
RESEND_API_KEY=""
EMAIL_FROM="noreply@circlely.app"
STORAGE_URL=""
STORAGE_ACCESS_KEY=""
STORAGE_SECRET_KEY=""
```

---

## Quick Setup & Local Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Sync & Seeding
```bash
npx prisma db push
npx prisma db seed
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Test Accounts

- **Admin Account**: `admin@circlely.app` / `password123`
- **User Account**: `alex@example.com` / `password123`
- **User Account 2**: `elena@example.com` / `password123`

---

## Production Build & Deployment

To verify and build for production (Vercel, Railway, Supabase):
```bash
npm run build
npm start
```
