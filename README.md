# Mediz
Medblocks - Medical records management made eazzzyyy!

# Requirements Summary
## Features

- **Frontend-only app** – No backend servers.
- **Pglite** - for data storage.

### Core Features

- Register new patients.
- Query patient records using raw SQL.
- Persist data across page refreshes.
- Work across multiple tabs with synchronized reads/writes.
- Clean git commit history (one feature per commit).
- Deploy using Vercel or Netlify.

### Documentation

- Setup & usage instructions.
- Challenges faced during development.

### 🔧 Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS
- **Database:** Pglite
- **State sync:** Pglite Worker + Live

## Setup - Installation
```
npm create vite@latest mediz-app -- --template react-ts
cd mediz-app
npm install
npm install tailwindcss @tailwindcss/vite
# See: https://tailwindcss.com/docs/installation/using-vite
npm install @electric-sql/pglite
# See: https://pglite.dev/docs/
npm install react-router-dom
# pglite error: https://pglite.dev/docs/bundler-support
npm run dev
```

### Database Schema
**Patient** - `Table`
```
- Name
- Date of Birth
- Gender
- Address
- Phone Number
- Purpose
- Remarks
```