import { prisma } from '@/lib/prisma';

export interface CreateProjectInput {
  title: string;
  image: string;
  imageAlt: string;
  demoUrl?: string;
  infoUrl?: string;
  codeUrl?: string;
  date: string;
  author: string;
  tags: string[];
  hasDetails?: boolean;
}

export async function getAllProjects() {
  return await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getProjectById(id: string) {
  return await prisma.project.findUnique({
    where: { id },
  });
}

export async function createProject(data: CreateProjectInput) {
  return await prisma.project.create({
    data: {
      title: data.title,
      image: data.image,
      imageAlt: data.imageAlt,
      demoUrl: data.demoUrl,
      infoUrl: data.infoUrl,
      codeUrl: data.codeUrl,
      date: data.date,
      author: data.author,
      tags: data.tags,
      hasDetails: data.hasDetails ?? false,
    },
  });
}

export async function updateProject(id: string, data: Partial<CreateProjectInput>) {
  return await prisma.project.update({
    where: { id },
    data,
  });
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({
    where: { id },
  });
}

