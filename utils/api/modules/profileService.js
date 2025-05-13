/**
 * Profile Service
 * Handles profile-related API calls and data management
 */

import { ref, readonly } from 'vue';
import apiClient from '../apiClient';

// Profile state variables
const currentProfile = ref(null);
const profileLoading = ref(false);
const profileError = ref(null);
const skillAssessments = ref([]);
const assessmentsLoading = ref(false);

/**
 * Profile service with methods for profile management
 */
export const profileService = {
  // Expose state as readonly
  currentProfile: readonly(currentProfile),
  profileLoading: readonly(profileLoading),
  profileError: readonly(profileError),
  skillAssessments: readonly(skillAssessments),
  assessmentsLoading: readonly(assessmentsLoading),

  /**
   * Get user profile data by ID or username
   */
  async getProfile(identifier) {
    profileLoading.value = true;
    profileError.value = null;
    
    try {
      const response = await apiClient.get(`/profiles/${identifier}`);
      
      if (response.error) {
        profileError.value = response.message || 'Failed to load profile';
        return null;
      }
      
      currentProfile.value = response;
      return response;
    } catch (e) {
      profileError.value = 'An unexpected error occurred';
      console.error('Profile fetch error:', e);
      return null;
    } finally {
      profileLoading.value = false;
    }
  },

  /**
   * Get multiple profiles with optional filters
   */
  async getProfiles(filters = {}) {
    profileLoading.value = true;
    
    try {
      const response = await apiClient.get('/profiles', { 
        params: filters 
      });
      
      if (response.error) {
        return { error: response.message, data: [] };
      }
      
      return { data: response, error: null };
    } catch (e) {
      console.error('Profiles fetch error:', e);
      return { error: 'An unexpected error occurred', data: [] };
    } finally {
      profileLoading.value = false;
    }
  },

  /**
   * Get skill assessments for a profile
   */
  async getSkillAssessments(profileId, options = {}) {
    assessmentsLoading.value = true;
    
    try {
      const response = await apiClient.get(`/profiles/${profileId}/skills`, { 
        params: options 
      });
      
      if (response.error) {
        return [];
      }
      
      skillAssessments.value = response;
      return response;
    } catch (e) {
      console.error('Skills fetch error:', e);
      return [];
    } finally {
      assessmentsLoading.value = false;
    }
  },

  /**
   * Create a skill assessment
   */
  async createSkillAssessment(profileId, skillData) {
    try {
      const response = await apiClient.post(`/profiles/${profileId}/skills`, skillData);
      
      if (response.error) {
        return { error: response.message, data: null };
      }
      
      // Update local cache if we have skills loaded for this profile
      if (skillAssessments.value.length > 0) {
        skillAssessments.value = [...skillAssessments.value, response];
      }
      
      return { data: response, error: null };
    } catch (e) {
      console.error('Assessment create error:', e);
      return { error: 'An unexpected error occurred', data: null };
    }
  },

  /**
   * Update a skill assessment
   */
  async updateSkillAssessment(profileId, assessmentId, skillData) {
    try {
      const response = await apiClient.put(
        `/profiles/${profileId}/skills/${assessmentId}`, 
        skillData
      );
      
      if (response.error) {
        return { error: response.message, data: null };
      }
      
      // Update local cache if we have this assessment
      if (skillAssessments.value.length > 0) {
        skillAssessments.value = skillAssessments.value.map(item => 
          item.id === assessmentId ? { ...item, ...response } : item
        );
      }
      
      return { data: response, error: null };
    } catch (e) {
      console.error('Assessment update error:', e);
      return { error: 'An unexpected error occurred', data: null };
    }
  },
  
  /**
   * Get service records for a profile
   */
  async getServiceRecords(profileId, options = {}) {
    try {
      const response = await apiClient.get(`/profiles/${profileId}/services`, {
        params: options
      });
      
      if (response.error) {
        return { error: response.message, data: [] };
      }
      
      return { data: response, error: null };
    } catch (e) {
      console.error('Service records fetch error:', e);
      return { error: 'An unexpected error occurred', data: [] };
    }
  },
  
  /**
   * Update profile information
   */
  async updateProfile(profileId, profileData) {
    profileLoading.value = true;
    profileError.value = null;
    
    try {
      const response = await apiClient.patch(`/profiles/${profileId}`, profileData);
      
      if (response.error) {
        profileError.value = response.message || 'Failed to update profile';
        return false;
      }
      
      // Update current profile data if we're viewing this profile
      if (currentProfile.value && currentProfile.value.id === profileId) {
        currentProfile.value = { ...currentProfile.value, ...response };
      }
      
      return true;
    } catch (e) {
      profileError.value = 'An unexpected error occurred';
      console.error('Profile update error:', e);
      return false;
    } finally {
      profileLoading.value = false;
    }
  },
  
  /**
   * Clear current profile data from state
   */
  clearProfile() {
    currentProfile.value = null;
    skillAssessments.value = [];
  }
};

export default profileService;