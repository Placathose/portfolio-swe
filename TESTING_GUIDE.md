# Testing Guide for Project Form

## Prerequisites

Before testing, make sure you have:

1. **Development server running**:
   ```bash
   npm run dev
   ```

## Step 1: Start Development Server

```bash
npm run dev
```

The server should start at `http://localhost:3000`

## Step 2: View Projects

1. Go to `http://localhost:3000/projects`
2. You should see the projects grid displaying all projects
3. Projects are loaded from:
   - Static project array in `ProjectsSection.tsx`
   - MDX files in `content/projects/` directory

## Step 3: View Project Details

1. Click on a project card that has `hasDetails: true`
2. You should be redirected to `/project/[id]`
3. The project detail page displays the MDX content

## Step 4: Verify Projects Display

1. Check that all projects appear correctly
2. Verify images display properly
3. Check that tags are shown correctly
4. Verify links (demo, code, info) work when provided

## Adding New Projects

Projects can be added in two ways:

### Option 1: Add to Static Array

Edit `src/components/ProjectsSection.tsx` and add a new project object to the `projects` array.

### Option 2: Create MDX File

1. Create a new `.mdx` file in `content/projects/` directory
2. Add frontmatter with project metadata:
   ```mdx
   ---
   id: "project-id"
   title: "Project Title"
   image: "/path/to/image.png"
   imageAlt: "Image description"
   date: "Jan 2025"
   author: "Your Name"
   tags: ["React", "Next.js"]
   ---
   
   Project content here...
   ```

## Common Issues & Solutions

### Issue: Projects not displaying
- **Check**: Projects array exists in `ProjectsSection.tsx`
- **Check**: MDX files exist in `content/projects/` directory
- **Verify**: File paths are correct

### Issue: Images not displaying
- **Check**: Image paths are correct (relative to `public/` directory)
- **Verify**: Image files exist in the `public/` directory

### Issue: Project details page not found
- **Check**: MDX file exists for the project ID
- **Verify**: `hasDetails` is set to `true` for the project

