# Cloudinary Setup Guide

## Prerequisites

1. **Cloudinary Account**: Sign up at [cloudinary.com](https://cloudinary.com)
2. **Get Your Credentials**: From your Cloudinary dashboard

## Step 1: Get Cloudinary Credentials

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Log in to your account
3. Go to **Settings** → **Product Environment Settings** (or check the dashboard homepage)
4. Copy the following:
   - **Cloud name** → `CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`

## Step 2: Set Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Cloudinary credentials to `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

## Step 3: Usage

### Creating a Project with Image Upload

The API route at `/api/projects` handles image upload to Cloudinary and saves the project to your Neon database.

#### Example: Create Project via API

```typescript
// Example: Creating a project from a form
async function createProject(formData: FormData) {
  const response = await fetch('/api/projects', {
    method: 'POST',
    body: formData, // FormData with image file and project data
  });
  
  const project = await response.json();
  return project;
}

// Usage in a form component
function ProjectForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Add image file
    const imageInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    if (imageInput?.files?.[0]) {
      formData.append('image', imageInput.files[0]);
    }
    
    // Add other fields
    formData.append('title', 'My Project');
    formData.append('imageAlt', 'Project image');
    formData.append('date', 'Jan 2025');
    formData.append('author', 'Your Name');
    formData.append('tags', 'React, Next.js, TypeScript'); // Comma-separated
    formData.append('hasDetails', 'false');
    
    const project = await createProject(formData);
    console.log('Project created:', project);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" accept="image/*" required />
      <input type="text" name="title" required />
      {/* ... other fields ... */}
      <button type="submit">Create Project</button>
    </form>
  );
}
```

### Using Cloudinary Helpers Directly

If you already have a Cloudinary URL, you can use the database helpers directly:

```typescript
import { createProject } from '@/lib/db/projects';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

// Upload image first
const imageFile = // ... your file
const bytes = await imageFile.arrayBuffer();
const buffer = Buffer.from(bytes);
const base64 = buffer.toString('base64');
const dataUrl = `data:${imageFile.type};base64,${base64}`;

const cloudinaryUrl = await uploadImageToCloudinary(dataUrl, 'projects');

// Then create project
const project = await createProject({
  title: 'My Project',
  image: cloudinaryUrl, // Cloudinary URL
  imageAlt: 'Project image',
  date: 'Jan 2025',
  author: 'Your Name',
  tags: ['React', 'Next.js'],
  hasDetails: false,
});
```

## API Endpoints

### POST `/api/projects`

Creates a new project with image upload.

**Request (FormData):**
- `image` (File) - Required - Image file
- `title` (string) - Required
- `imageAlt` (string) - Required
- `date` (string) - Required
- `author` (string) - Required
- `tags` (string) - Required - Comma-separated tags
- `demoUrl` (string) - Optional
- `infoUrl` (string) - Optional
- `codeUrl` (string) - Optional
- `hasDetails` (string) - Optional - "true" or "false"

**Response:**
```json
{
  "id": "uuid",
  "title": "My Project",
  "image": "https://res.cloudinary.com/.../projects/...",
  "imageAlt": "Project image",
  ...
}
```

### GET `/api/projects`

Fetches all projects from the database.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "My Project",
    "image": "https://res.cloudinary.com/...",
    ...
  }
]
```

## Image Storage

- Images are uploaded to Cloudinary in the `projects/` folder
- Images are automatically optimized by Cloudinary
- The Cloudinary URL is stored in the database
- Images are accessible via the returned `secure_url`

## Security Notes

- ⚠️ **Never expose** `CLOUDINARY_API_SECRET` in client-side code
- ✅ Keep it in `.env` file (server-side only)
- ✅ The API route handles uploads server-side
- ✅ `.env` should be in `.gitignore`

## Troubleshooting

### "Missing Cloudinary credentials"
- Check your `.env` file has all three Cloudinary variables
- Restart your dev server after adding variables
- Verify variable names match exactly (case-sensitive)

### "Error uploading to Cloudinary"
- Verify your API credentials are correct
- Check your Cloudinary account is active
- Ensure you have upload permissions

### Image not showing
- Check the Cloudinary URL is returned correctly
- Verify the image was uploaded successfully in Cloudinary dashboard
- Check browser console for CORS or loading errors

