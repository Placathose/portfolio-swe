const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pb.brucewyatt.space',
        pathname: '/api/files/**',
      },
      {
        protocol: 'https',
        hostname: 'codrops-1f606.kxcdn.com',
      },
    ],
  },
};

export default config;

