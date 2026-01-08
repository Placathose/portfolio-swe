import { prisma } from '../prisma';

export type Project = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  demoUrl: string | null;
  infoUrl: string | null;
  codeUrl: string | null;
  date: string;
  author: string;
  tags: string[];
  hasDetails: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectInput = {
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
};

export async function getAllProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getProjectById(id: string): Promise<Project | null> {
  return prisma.project.findUnique({
    where: { id },
  });
}

export async function createProject(data: ProjectInput): Promise<Project> {
  return prisma.project.create({
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

export async function updateProject(
  id: string,
  data: Partial<ProjectInput>
): Promise<Project> {
  return prisma.project.update({
    where: { id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.image && { image: data.image }),
      ...(data.imageAlt && { imageAlt: data.imageAlt }),
      ...(data.demoUrl !== undefined && { demoUrl: data.demoUrl }),
      ...(data.infoUrl !== undefined && { infoUrl: data.infoUrl }),
      ...(data.codeUrl !== undefined && { codeUrl: data.codeUrl }),
      ...(data.date && { date: data.date }),
      ...(data.author && { author: data.author }),
      ...(data.tags && { tags: data.tags }),
      ...(data.hasDetails !== undefined && { hasDetails: data.hasDetails }),
    },
  });
}

export async function deleteProject(id: string): Promise<void> {
  await prisma.project.delete({
    where: { id },
  });
}

