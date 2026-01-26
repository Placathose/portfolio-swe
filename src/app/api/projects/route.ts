import { NextResponse } from 'next/server';
import { getPocketBase } from '@/lib/pocketbase'

export async function GET() {
  try {
    const pb = getPocketBase();
    const pbUrl = process.env.POCKETBASE_URL || '';

    const data = await pb.collection('portfolio_projects').getFullList({
      sort: 'created',
    });

    console.log('PocketBase raw data:', JSON.stringify(data, null, 2));

    const projects = data.map(record => ({
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
    }));

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}