import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const projects = defineDocs({
  dir: 'content/projects',
  meta: {
    image: 'string',
    imageAlt: 'string',
    demoUrl: 'string',
    infoUrl: 'string',
    codeUrl: 'string',
    date: 'string',
    author: 'string',
    tags: 'string',
    hasDetails: 'boolean',
  },
});

export default defineConfig();

