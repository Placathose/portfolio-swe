# Neon Database Setup Guide

## Prerequisites

1. **Neon Account**: Sign up at [neon.tech](https://neon.tech)
2. **Create a Project**: Create a new project in your Neon dashboard

## Step 1: Get Your Connection String

1. Go to your Neon dashboard: [console.neon.tech](https://console.neon.tech)
2. Select your project
3. Go to **Connection Details** or **Settings**
4. Copy the **Connection string**
   - It will look like: `postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/database?sslmode=require`

## Step 2: Set Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Neon connection string to `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@ep-xxxxx.us-east-2.aws.neon.tech/database?sslmode=require"
   ```

## Step 3: Generate Prisma Client

```bash
npm run db:generate
```

This creates the Prisma Client based on your schema.

## Step 4: Push Schema to Database

```bash
npm run db:push
```

This creates the `projects` table in your Neon database.

## Step 5: Verify Setup

Open Prisma Studio to view your database:

```bash
npm run db:studio
```

This opens a visual database browser at `http://localhost:5555`.

## Usage

### Import Database Helpers

```typescript
import { getAllProjects, createProject, getProjectById } from '@/lib/db/projects';

// Get all projects
const projects = await getAllProjects();

// Get single project
const project = await getProjectById('project-id');

// Create new project
const newProject = await createProject({
  title: 'My Project',
  image: 'https://example.com/image.jpg',
  imageAlt: 'Project image',
  date: 'Jan 2025',
  author: 'Your Name',
  tags: ['React', 'Next.js'],
});
```

## Available Scripts

- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database (creates/updates tables)
- `npm run db:migrate` - Create and apply migrations
- `npm run db:studio` - Open Prisma Studio (visual database browser)

## Project Model

The `Project` model includes:
- `id`: UUID (auto-generated)
- `title`: Project title
- `image`: Image URL
- `imageAlt`: Image alt text
- `demoUrl`: Optional demo URL
- `infoUrl`: Optional info URL
- `codeUrl`: Optional code repository URL
- `date`: Project date
- `author`: Author name
- `tags`: Array of tags
- `hasDetails`: Boolean for MDX details availability
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

## Troubleshooting

### "Can't reach database server"
- Check your `DATABASE_URL` is correct
- Verify your Neon project is active
- Ensure the connection string includes `?sslmode=require`

### "Module '@prisma/client' has no exported member"
- Run `npm run db:generate` first

### Connection timeout
- Check your Neon project isn't paused
- Verify network connectivity

