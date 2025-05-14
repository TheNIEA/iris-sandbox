/**
 * Config composable
 * 
 * Provides easy access to environment-specific configuration
 * in both client and server contexts
 */
import { useRuntimeConfig } from '#app';

export const useConfig = () => {
  const config = useRuntimeConfig();
  
  // Helper to determine current environment
  const isProduction = () => config.public.appMode === 'production';
  const isDevelopment = () => config.public.appMode === 'development';
  
  // API configs
  const apiBaseUrl = config.public.apiBaseUrl;
  const apiVersion = config.public.apiVersion;
  
  // Get full API URL with endpoint
  const getApiUrl = (endpoint) => {
    const baseUrl = apiBaseUrl || 'http://localhost:3001/api';
    const version = apiVersion || 'v1';
    return `${baseUrl}/${version}/${endpoint}`.replace(/\/+/g, '/').replace(/\/$/, '');
  };
  
  // AWS specific configurations
  const awsConfig = {
    region: config.public.awsRegion,
    cloudfrontUrl: config.public.awsCloudfrontUrl,
    s3Bucket: config.public.s3Bucket
  };
  
  // Feature flags
  const features = {
    debugMode: Boolean(config.public.debugMode),
    useMockData: Boolean(config.public.enableMockData)
  };
  
  // Auth configuration
  const auth = {
    storageKey: config.public.authStorageKey || 'mayo_auth_token'
  };
  
  return {
    // Environment helpers
    isProduction,
    isDevelopment,
    
    // API helpers
    apiBaseUrl,
    apiVersion,
    getApiUrl,
    
    // AWS configuration
    aws: awsConfig,
    
    // Feature flags
    features,
    
    // Auth configuration
    auth
  };
};