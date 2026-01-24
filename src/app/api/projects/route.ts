import { NextRequest, NextResponse } from 'next/server';
import { createProject } from '@/lib/db/projects';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Get text fields
    const title = formData.get('title') as string;
    const imageUrl = formData.get('image') as string;
    const imageAlt = formData.get('imageAlt') as string;
    const demoUrl = formData.get('demoUrl') as string | null;
    const infoUrl = formData.get('infoUrl') as string | null;
    const codeUrl = formData.get('codeUrl') as string | null;
    const date = formData.get('date') as string;
    const author = formData.get('author') as string;
    const tagsString = formData.get('tags') as string;
    const hasDetails = formData.get('hasDetails') === 'true';
    
    if (!title || !imageUrl || !imageAlt || !date || !author || !tagsString) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate image URL format
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid image URL format' },
        { status: 400 }
      );
    }

    // Parse tags (comma-separated string to array)
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);

    // Create project in database
    const project = await createProject({
      title,
      image: imageUrl,
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

