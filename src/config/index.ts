// Centralized configuration
export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'User Management',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  }
}

// Type-safe environment variables
declare global {
  interface ImportMetaEnv {
    VITE_API_BASE_URL: string
    VITE_API_TIMEOUT: string
    VITE_APP_NAME: string
    VITE_APP_VERSION: string
  }
} 