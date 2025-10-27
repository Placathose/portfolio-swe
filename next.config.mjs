import { createMDX } from 'fumadocs-mdx/next';

const config = {
  images: {
    domains: ['codrops-1f606.kxcdn.com'],
  },
};

const withMDX = createMDX();
export default withMDX(config);

