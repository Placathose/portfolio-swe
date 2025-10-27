import { projects } from '@/.source';
import { loader } from 'fumadocs-core/source';

export const projectSource = loader({
  baseUrl: '/project',
  source: projects.toFumadocsSource(),
});

