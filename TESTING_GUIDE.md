# Testing Guide for Project Form

## Prerequisites

Before testing, make sure you have:

1. **Environment variables set up** in `.env`:
   ```env
   DATABASE_URL="your_neon_connection_string"
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

2. **Database set up**:
   ```bash
   npm run db:generate
   npm run db:push
   ```

## Step 1: Start Development Server

```bash
npm run dev
```

The server should start at `http://localhost:3000`

## Step 2: Navigate to the Form

1. Go to `http://localhost:3000/projects`
2. Click the **"Add New Project"** button
3. You should see the form at `http://localhost:3000/projects/new`

## Step 3: Test Form Validation

### Test Required Fields

1. Try submitting the form without filling any fields
2. You should see validation errors for:
   - Title
   - Image
   - Image Alt Text
   - Date
   - Author
   - Tags

### Test URL Validation

1. Fill in required fields
2. Enter invalid URLs in Demo URL, Info URL, or Code URL fields (e.g., "not-a-url")
3. You should see "Must be a valid URL" error

## Step 4: Test Image Upload

1. Click the file input for "Project Image"
2. Select an image file (JPG, PNG, etc.)
3. **Verify**: Image preview appears below the input
4. The preview should show your selected image

## Step 5: Test Form Submission

### Fill Out Complete Form

1. **Title**: "Test Project"
2. **Image**: Select any image file (preview should show)
3. **Image Alt Text**: "Test project image"
4. **Date**: "Jan 2025"
5. **Author**: "Your Name"
6. **Tags**: "React, Next.js, TypeScript"
7. **Demo URL**: "https://example.com/demo" (optional)
8. **Info URL**: "https://example.com/info" (optional)
9. **Code URL**: "https://github.com/user/repo" (optional)
10. **Has Details**: Check or leave unchecked

### Submit the Form

1. Click **"Create Project"** button
2. Button should show "Creating..." while submitting
3. You should be redirected to `/projects` page
4. Your new project should appear in the projects list

## Step 6: Verify Data in Database

### Option 1: Prisma Studio

```bash
npm run db:studio
```

1. Opens at `http://localhost:5555`
2. Click on "Project" model
3. Verify your project data is saved correctly

### Option 2: Check Projects Page

1. Go to `http://localhost:3000/projects`
2. Your new project should appear in the grid
3. Check that:
   - Image displays correctly (from Cloudinary)
   - All fields are shown correctly
   - Tags are displayed

## Step 7: Verify Cloudinary Upload

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Navigate to **Media Library**
3. Check the `projects/` folder
4. Your uploaded image should be there
5. Verify the image URL matches what's in the database

## Step 8: Test Error Handling

### Test Network Error

1. Temporarily disable your internet
2. Try submitting the form
3. You should see an error message

### Test Invalid Image

1. Try uploading a non-image file (if file input allows)
2. Should show validation error

## Step 9: Test Cancel Button

1. Fill out the form (don't submit)
2. Click **"Cancel"** button
3. Should redirect back to `/projects` page
4. Form data should not be saved

## Step 10: Test Multiple Submissions

1. Create multiple projects with different data
2. Verify all appear on `/projects` page
3. Check database has all entries
4. Verify all images are in Cloudinary

## Common Issues & Solutions

### Issue: "Failed to create project"
- **Check**: Browser console for errors
- **Check**: Server terminal for error logs
- **Verify**: All environment variables are set
- **Verify**: Database connection is working

### Issue: Image not uploading
- **Check**: Cloudinary credentials in `.env`
- **Check**: Cloudinary dashboard for upload errors
- **Verify**: Image file size (Cloudinary has limits)

### Issue: Form not submitting
- **Check**: Browser console for JavaScript errors
- **Check**: Network tab for API request
- **Verify**: API route is accessible at `/api/projects`

### Issue: Redirect not working
- **Check**: Router is imported correctly
- **Check**: `/projects` page exists
- **Verify**: No errors in browser console

## Quick Test Checklist

- [ ] Form page loads at `/projects/new`
- [ ] All form fields are visible
- [ ] Required field validation works
- [ ] Image preview works
- [ ] Form submission works
- [ ] Redirect to `/projects` works
- [ ] Project appears in projects list
- [ ] Image displays correctly (from Cloudinary)
- [ ] Data saved to database
- [ ] Cancel button works
- [ ] Error messages display correctly

## Testing with Different Data

Try creating projects with:
- Different image formats (JPG, PNG, WebP)
- Different tag combinations
- With and without optional URLs
- With and without "Has Details" checked
- Very long titles/descriptions
- Special characters in tags

## Next Steps After Testing

Once everything works:
1. Test editing projects (if you add that feature)
2. Test deleting projects (if you add that feature)
3. Add authentication (if needed)
4. Add form validation improvements
5. Add better error messages

