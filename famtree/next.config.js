const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['127.0.0.1'], // Add your image domain here
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/reset/:uid/:token',
  //       destination: '/reset/[resetid]',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;