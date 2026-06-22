/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api'
    if (apiUrl.startsWith('http')) {
      return [
        {
          source: '/api/:path*',
          destination: `${apiUrl}/:path*`
        }
      ]
    }
    return []
  }
}
module.exports = nextConfig
