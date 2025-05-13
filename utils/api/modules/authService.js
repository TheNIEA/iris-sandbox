/**
 * Authentication Service
 * Handles user authentication, registration, and token management
 */

import { ref, readonly } from 'vue';
import apiClient from '../apiClient';

// User authentication state
const user = ref(null);
const isAuthenticated = ref(false);
const isLoading = ref(false);
const error = ref(null);

// Load saved auth data on initialization (browser only)
if (typeof window !== 'undefined') {
  try {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      user.value = JSON.parse(savedUser);
      isAuthenticated.value = true;
    }
  } catch (e) {
    console.error('Failed to load saved auth data', e);
  }
}

/**
 * Authentication service with methods for user management
 */
export const authService = {
  // Readonly state that can be consumed by components
  user: readonly(user),
  isAuthenticated: readonly(isAuthenticated),
  isLoading: readonly(isLoading),
  error: readonly(error),

  /**
   * Login user with email and password
   */
  async login(email, password) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      
      if (response.error) {
        error.value = response.message || 'Login failed';
        return false;
      }
      
      // Save user data and token
      user.value = response.user;
      isAuthenticated.value = true;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('authToken', response.token);
      }
      
      return true;
    } catch (e) {
      error.value = 'An unexpected error occurred';
      console.error('Login error:', e);
      return false;
    } finally {
      isLoading.value = false;
    }
  },
  
  /**
   * Register a new user
   */
  async register(userData) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await apiClient.post('/auth/register', userData);
      
      if (response.error) {
        error.value = response.message || 'Registration failed';
        return false;
      }
      
      // Auto login after registration if response includes user and token
      if (response.user && response.token) {
        user.value = response.user;
        isAuthenticated.value = true;
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('authToken', response.token);
        }
      }
      
      return true;
    } catch (e) {
      error.value = 'An unexpected error occurred';
      console.error('Registration error:', e);
      return false;
    } finally {
      isLoading.value = false;
    }
  },
  
  /**
   * Logout current user
   */
  async logout() {
    isLoading.value = true;
    
    try {
      // Call logout endpoint if needed
      await apiClient.post('/auth/logout');
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      // Always clear local state regardless of API response
      user.value = null;
      isAuthenticated.value = false;
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
      
      // Clear any cached authenticated requests
      apiClient.clearCache();
      
      isLoading.value = false;
    }
  },
  
  /**
   * Check if current auth token is valid and refresh user data
   */
  async checkAuth() {
    if (!localStorage.getItem('authToken')) {
      return false;
    }
    
    isLoading.value = true;
    
    try {
      const response = await apiClient.get('/auth/me');
      
      if (response.error || !response.user) {
        this.logout();
        return false;
      }
      
      // Update user data
      user.value = response.user;
      isAuthenticated.value = true;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return true;
    } catch (e) {
      console.error('Auth check error:', e);
      this.logout();
      return false;
    } finally {
      isLoading.value = false;
    }
  },
  
  /**
   * Reset user password
   */
  async resetPassword(email) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await apiClient.post('/auth/reset-password', { email });
      
      if (response.error) {
        error.value = response.message || 'Password reset request failed';
        return false;
      }
      
      return true;
    } catch (e) {
      error.value = 'An unexpected error occurred';
      console.error('Password reset error:', e);
      return false;
    } finally {
      isLoading.value = false;
    }
  },
  
  /**
   * Update user password with reset token
   */
  async confirmPasswordReset(token, newPassword) {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await apiClient.post('/auth/reset-password/confirm', { 
        token, 
        password: newPassword 
      });
      
      if (response.error) {
        error.value = response.message || 'Password reset failed';
        return false;
      }
      
      return true;
    } catch (e) {
      error.value = 'An unexpected error occurred';
      console.error('Password reset confirmation error:', e);
      return false;
    } finally {
      isLoading.value = false;
    }
  },
  
  /**
   * Update current user profile
   */
  async updateProfile(profileData) {
    if (!isAuthenticated.value) {
      error.value = 'You must be logged in';
      return false;
    }
    
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await apiClient.patch('/auth/profile', profileData);
      
      if (response.error) {
        error.value = response.message || 'Failed to update profile';
        return false;
      }
      
      // Update local user data
      user.value = {
        ...user.value,
        ...response.user
      };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user.value));
      }
      
      return true;
    } catch (e) {
      error.value = 'An unexpected error occurred';
      console.error('Profile update error:', e);
      return false;
    } finally {
      isLoading.value = false;
    }
  }
};

export default authService;