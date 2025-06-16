# Deployment Guide for Coolify

## Download the Project

To download your project files for deployment on Coolify, you can either:

### Option 1: Git Clone (Recommended)
If this is a Git repository, clone it to your local machine:
```bash
git clone <your-repo-url>
cd team-stress-monitor
```

### Option 2: Manual Download
Download the following files and maintain the directory structure:

**Root Files:**
- `package.json`
- `package-lock.json`
- `Dockerfile`
- `docker-compose.yml`
- `init.sql`
- `.env.example`
- `drizzle.config.ts`
- `vite.config.ts`
- `tailwind.config.ts`
- `tsconfig.json`
- `postcss.config.js`
- `components.json`

**Server Directory:**
- `server/index.ts`
- `server/routes.ts`
- `server/storage.ts`
- `server/db.ts`
- `server/vite.ts`

**Client Directory:**
- `client/index.html`
- `client/src/main.tsx`
- `client/src/App.tsx`
- `client/src/index.css`
- All component files in `client/src/components/`
- All page files in `client/src/pages/`
- All library files in `client/src/lib/`
- All hook files in `client/src/hooks/`

**Shared Directory:**
- `shared/schema.ts`

## Coolify Deployment Steps

### 1. Create New Project in Coolify
1. Log into your Coolify dashboard
2. Click "New Resource" → "Application"
3. Choose "Docker Compose" or "Dockerfile" as deployment method

### 2. Environment Variables
Set these environment variables in Coolify:
```
DATABASE_URL=postgresql://username:password@db:5432/team_stress_monitor
NODE_ENV=production
PORT=5000
POSTGRES_PASSWORD=your_secure_password
```

### 3. Deployment Configuration

**For Docker Compose deployment:**
- Upload your `docker-compose.yml` file
- Coolify will automatically handle the PostgreSQL database

**For Dockerfile deployment:**
- Use the provided `Dockerfile`
- Set up a separate PostgreSQL service in Coolify
- Update `DATABASE_URL` to point to your PostgreSQL service

### 4. Domain Configuration
1. In Coolify, go to your application settings
2. Add your domain or use the provided subdomain
3. Enable SSL/TLS certificates

### 5. Deploy
1. Click "Deploy" in Coolify
2. Monitor the build logs
3. Once deployed, your stress monitor will be available at your configured domain

## Post-Deployment

### Database Initialization
The database will be automatically initialized with default team members via the `init.sql` script.

### Health Check
The application includes a health check endpoint at `/api/team-members` that Coolify can use to monitor the service.

### Scaling
The application is stateless and can be horizontally scaled in Coolify if needed.

## Troubleshooting

**Build Issues:**
- Ensure all Node.js dependencies are properly listed in `package.json`
- Check that the `DATABASE_URL` environment variable is correctly set

**Database Connection:**
- Verify PostgreSQL service is running and accessible
- Check that database credentials in environment variables are correct

**Port Issues:**
- Application runs on port 5000 by default
- Ensure Coolify port mapping is configured correctly