# Team Stress Monitor

A fun, car-meter style stress monitoring web application where team members can track and share their stress levels in real-time.

## Features

- 🚗 Car-style gauge meters for visual stress display
- 😌😐😰 Emoji-rich interface with role-based icons
- 🎨 Dynamic color-coded backgrounds reflecting stress levels
- 👥 No login required - simply select yourself or add new members
- 📊 Real-time team summary dashboard
- 💾 PostgreSQL database for persistent storage

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query (React Query)

## Quick Start

### Using Docker Compose (Recommended)

1. Clone the repository
2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
3. Update the `.env` file with your database credentials
4. Run the application:
   ```bash
   docker-compose up -d
   ```
5. Access the app at `http://localhost:5000`

### Manual Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your PostgreSQL database and update the `DATABASE_URL` in `.env`

3. Push the database schema:
   ```bash
   npm run db:push
   ```

4. Build and start the application:
   ```bash
   npm run build
   npm start
   ```

## Deployment on Coolify

1. Create a new project in Coolify
2. Connect your Git repository
3. Set the following environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
4. Use the included Dockerfile for container deployment
5. Deploy and access your team stress monitor!

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Application environment (development/production)
- `PORT`: Application port (default: 5000)

## API Endpoints

- `GET /api/team-members` - Get all team members
- `GET /api/team-members/:id` - Get specific team member
- `POST /api/team-members` - Create new team member
- `PATCH /api/team-members/:id/stress` - Update stress level

## License

MIT License