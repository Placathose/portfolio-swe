import { NextRequest, NextResponse } from 'next/server';
import { createProject } from '@/lib/db/projects';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Get text fields
    const title = formData.get('title') as string;
    const imageAlt = formData.get('imageAlt') as string;
    const demoUrl = formData.get('demoUrl') as string | null;
    const infoUrl = formData.get('infoUrl') as string | null;
    const codeUrl = formData.get('codeUrl') as string | null;
    const date = formData.get('date') as string;
    const author = formData.get('author') as string;
    const tagsString = formData.get('tags') as string;
    const hasDetails = formData.get('hasDetails') === 'true';
    
    // Get image file
    const imageFile = formData.get('image') as File | null;
    
    if (!title || !imageAlt || !date || !author || !tagsString) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!imageFile) {
      return NextResponse.json(
        { error: 'Image file is required' },
        { status: 400 }
      );
    }

    // Convert File to buffer for Cloudinary
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Convert buffer to data URL for Cloudinary
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${imageFile.type};base64,${base64}`;

    // Upload image to Cloudinary
    const cloudinaryUrl = await uploadImageToCloudinary(dataUrl, 'projects');

    // Parse tags (comma-separated string to array)
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);

    // Create project in database
    const project = await createProject({
      title,
      image: cloudinaryUrl,
      imageAlt,
      demoUrl: demoUrl || undefined,
      infoUrl: infoUrl || undefined,
      codeUrl: codeUrl || undefined,
      date,
      author,
      tags,
      hasDetails,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { getAllProjects } = await import('@/lib/db/projects');
    const projects = await getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

