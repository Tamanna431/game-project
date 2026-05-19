/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/**' },
    { protocol: 'https', hostname: 'cdn.pixabay.com', pathname: '/**' },
    { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
  ],
}
};

export default nextConfig;