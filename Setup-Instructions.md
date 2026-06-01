# Recipe Manager — Developer Setup

## Prerequisites

Make sure you have the following installed before getting started:

- **Node.js** v20+
- **npm** or **pnpm**
- **PostgreSQL** v15+ (running locally or a hosted instance)
- **Docker** and **Docker Compose** (if using the provided db instance)
- **Git**

---

## 1. Clone the Repository

```bash
git clone https://github.com/sninker2013/Recipe-Browser
cd cd recipe-browser
```

---

## 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

---

## 3. Set Up the Database

Either connect to a PostgreSQL instance of your choice or run the provided docker image:

```bash
docker compose up -d
```

---

## 3. Configure Environment Variables

```bash
touch .env
```

Open `.env` and set the following:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/recipe_manager" # postgresql://postgres:postgres@localhost:5435/db if using the provided docker container
 
# BetterAuth
BETTER_AUTH_SECRET="your-random-secret-here"   # generate with: openssl rand -base64 32
BETTER_AUTH_URL="http://localhost:3000"          # change to your deployed URL in production
```

> **Never commit `.env` to Git.** It's already in `.gitignore`.

---

## 5. Run Migrations

Apply the Drizzle schema to your database:

```bash
npx drizzle-kit migrate
```

If you need to push schema changes without migrations (dev only):

```bash
npx drizzle-kit push
```

---

## 6. Seed the Database

Populate the database with the initial categories:

```bash
npm run seed
# or
npx tsx lib/db/seed.ts
```

---

## 7. Start the Development Server

```bash
npm run dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).
