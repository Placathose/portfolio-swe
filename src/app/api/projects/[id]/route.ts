import { NextRequest, NextResponse } from 'next/server';
import { getPocketBase } from '@/lib/pocketbase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pb = getPocketBase();
    const pbUrl = process.env.POCKETBASE_URL || '';
    
    // Fetch single project by ID
    const record = await pb.collection('portfolio_projects').getOne(id);

    console.log('PocketBase raw record:', JSON.stringify(record, null, 2));
    
    // Transform to match your project shape
    const project = {
      id: record.id,
      title: record.title,
      image: record.image ? `${pbUrl}/api/files/portfolio_projects/${record.id}/${record.image}` : '/characterbuilder.png',
      imageAlt: record.imageAlt,
      demoUrl: record.demoUrl || undefined,
      codeUrl: record.codeUrl || undefined,
      infoUrl: record.infoUrl || undefined,
      date: record.date,
      author: record.author,
      tags: typeof record.tags === 'string' 
        ? JSON.parse(record.tags) 
        : record.tags,
    };
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Project not found' },
      { status: 404 }
    );
  }
}