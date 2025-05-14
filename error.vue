<template>
  <div class="error-container">
    <div class="error-content">
      <h1 class="error-title">{{ errorTitle }}</h1>
      <p class="error-message">{{ errorMessage }}</p>
      
      <div class="error-details" v-if="showDetails">
        <pre>{{ error }}</pre>
      </div>
      
      <div class="error-actions">
        <Button @click="handleRetry">Retry</Button>
        <Button @click="handleGoHome" variant="secondary">Go Home</Button>
        <Button @click="toggleDetails" variant="text" v-if="isDebugEnabled">
          {{ showDetails ? 'Hide Details' : 'Show Details' }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useError, clearError } from '#app';
import { useRouter } from 'vue-router';
import { useConfig } from '~/utils/config/useConfig';
import Button from '~/components/ui/Button.vue';

// Get error from Nuxt
const error = useError();
const router = useRouter();
const { features } = useConfig();

// UI state
const showDetails = ref(false);

// Check if debug mode is enabled for detailed error info
const isDebugEnabled = computed(() => features.debugMode);

// Determine error title and message based on error code
const errorTitle = computed(() => {
  if (!error.value) return 'An error occurred';
  
  switch (error.value.statusCode) {
    case 404:
      return 'Page Not Found';
    case 403:
      return 'Access Denied';
    case 500:
      return 'Server Error';
    default:
      return `Error ${error.value.statusCode || ''}`;
  }
});

const errorMessage = computed(() => {
  if (!error.value) return 'Something went wrong. Please try again later.';
  
  switch (error.value.statusCode) {
    case 404:
      return 'We couldn\'t find the page you were looking for.';
    case 403:
      return 'You don\'t have permission to access this resource.';
    case 500:
      return 'Something went wrong on our end. We\'re working to fix it.';
    default:
      return error.value.message || 'An unexpected error occurred.';
  }
});

// Error reporting
if (process.client && error.value) {
  // Use our logger to send to CloudWatch (if in production)
  const { $logger } = useNuxtApp();
  if ($logger) {
    $logger.error('Application error page shown', {
      error: {
        statusCode: error.value.statusCode,
        message: error.value.message,
        stack: error.value.stack
      },
      url: window.location.href
    });
  }
}

// Action handlers
const handleRetry = () => {
  clearError();
  router.go(0); // Refresh the current page
};

const handleGoHome = () => {
  clearError();
  router.push('/');
};

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: var(--background, #f9fafb);
  color: var(--text-primary, #111827);
}

.error-content {
  max-width: 32rem;
  width: 100%;
  padding: 2rem;
  background-color: var(--surface-default, white);
  border-radius: var(--borderRadius-lg, 0.5rem);
  box-shadow: var(--boxShadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
  text-align: center;
}

.error-title {
  font-size: var(--fontSize-3xl, 1.875rem);
  font-weight: var(--fontWeight-bold, 700);
  color: var(--text-primary, #111827);
  margin-bottom: 1rem;
}

.error-message {
  font-size: var(--fontSize-lg, 1.125rem);
  color: var(--text-secondary, #374151);
  margin-bottom: 2rem;
}

.error-details {
  margin: 2rem 0;
  padding: 1rem;
  background-color: var(--surface-sunken, #f3f4f6);
  border-radius: var(--borderRadius-md, 0.25rem);
  text-align: left;
  overflow-x: auto;
}

.error-details pre {
  font-family: var(--fontFamily-mono, monospace);
  font-size: var(--fontSize-sm, 0.875rem);
  white-space: pre-wrap;
  word-break: break-word;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>