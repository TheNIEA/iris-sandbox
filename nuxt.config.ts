// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  modules: ['@nuxtjs/tailwindcss'],
  plugins: [
    '~/utils/modalPlugin.js',
    '~/plugins/theme.js',
    '~/plugins/aws-monitoring.js',
    '~/plugins/aws-integration.js'
  ],
  
  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys that are only available on the server
    apiSecret: process.env.API_SECRET,
    
    // Public keys that are exposed to the client
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      apiVersion: process.env.NUXT_PUBLIC_API_VERSION,
      appMode: process.env.NUXT_PUBLIC_APP_MODE,
      authStorageKey: process.env.NUXT_PUBLIC_AUTH_STORAGE_KEY,
      debugMode: process.env.NUXT_PUBLIC_DEBUG_MODE === 'true',
      enableMockData: process.env.NUXT_PUBLIC_ENABLE_MOCK_DATA === 'true',
      
      // Application version for tracking
      appVersion: '1.0.0',
      
      // AWS configurations if available
      awsRegion: process.env.NUXT_PUBLIC_AWS_REGION,
      awsCloudfrontUrl: process.env.NUXT_PUBLIC_AWS_CLOUDFRONT_URL,
      s3Bucket: process.env.NUXT_PUBLIC_S3_BUCKET,
      
      // Analytics
      analyticsKey: process.env.NUXT_PUBLIC_ANALYTICS_KEY,
    }
  },
  
  // Build configuration for production (AWS deployment)
  app: {
    head: {
      title: process.env.APP_NAME || 'Mayo Test App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Modern application built with Nuxt 3' },
        // Security headers
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        // Add CSP in meta tag as fallback (ideally set at server/CDN level)
        ...(process.env.NODE_ENV === 'production' ? [{
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; script-src 'self' https://cdn.amazonaws.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com"
        }] : [])
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // Optimize for production
  nitro: {
    compressPublicAssets: true,
    // Configure security headers for Nitro server
    routeRules: {
      '/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
      },
      // Cache static assets longer
      '/assets/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      }
    }
  },
  
  // Improve performance in production
  experimental: {
    payloadExtraction: true,
    crossOriginPrefetch: true,
    viewTransition: true
  }
})
