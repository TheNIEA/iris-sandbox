/**
 * Assessment Service
 * Handles all assessment-related API calls and data management
 */

import { ref, readonly } from 'vue';
import apiClient from '../apiClient';

// Assessment state
const userAssessments = ref([]);
const currentAssessment = ref(null);
const loadingAssessments = ref(false);
const assessmentError = ref(null);

/**
 * Assessment service with methods for managing skill assessments
 */
export const assessmentService = {
  // Expose state as readonly
  userAssessments: readonly(userAssessments),
  currentAssessment: readonly(currentAssessment),
  loadingAssessments: readonly(loadingAssessments),
  assessmentError: readonly(assessmentError),

  /**
   * Get all assessments for a user
   */
  async getUserAssessments(userId, options = {}) {
    loadingAssessments.value = true;
    assessmentError.value = null;
    
    try {
      const response = await apiClient.get(`/users/${userId}/assessments`, { 
        params: options
      });
      
      if (response.error) {
        assessmentError.value = response.message || 'Failed to load assessments';
        return [];
      }
      
      userAssessments.value = response;
      return response;
    } catch (e) {
      assessmentError.value = 'An unexpected error occurred';
      console.error('Assessments fetch error:', e);
      return [];
    } finally {
      loadingAssessments.value = false;
    }
  },

  /**
   * Get a specific assessment by ID
   */
  async getAssessmentById(assessmentId) {
    loadingAssessments.value = true;
    assessmentError.value = null;
    
    try {
      const response = await apiClient.get(`/assessments/${assessmentId}`);
      
      if (response.error) {
        assessmentError.value = response.message || 'Failed to load assessment';
        return null;
      }
      
      currentAssessment.value = response;
      return response;
    } catch (e) {
      assessmentError.value = 'An unexpected error occurred';
      console.error(`Assessment ${assessmentId} fetch error:`, e);
      return null;
    } finally {
      loadingAssessments.value = false;
    }
  },

  /**
   * Start a new assessment
   */
  async startAssessment(skillId, userId) {
    loadingAssessments.value = true;
    assessmentError.value = null;
    
    try {
      const response = await apiClient.post('/assessments/start', {
        skillId,
        userId
      });
      
      if (response.error) {
        assessmentError.value = response.message || 'Failed to start assessment';
        return null;
      }
      
      currentAssessment.value = response;
      return response;
    } catch (e) {
      assessmentError.value = 'An unexpected error occurred';
      console.error('Assessment start error:', e);
      return null;
    } finally {
      loadingAssessments.value = false;
    }
  },

  /**
   * Submit an answer for the current question in an assessment
   */
  async submitAnswer(assessmentId, questionId, answer) {
    loadingAssessments.value = true;
    assessmentError.value = null;
    
    try {
      const response = await apiClient.post(`/assessments/${assessmentId}/submit`, {
        questionId,
        answer
      });
      
      if (response.error) {
        assessmentError.value = response.message || 'Failed to submit answer';
        return null;
      }
      
      // Update the current assessment with new data
      if (currentAssessment.value && currentAssessment.value.id === assessmentId) {
        currentAssessment.value = {
          ...currentAssessment.value,
          ...response
        };
      }
      
      return response;
    } catch (e) {
      assessmentError.value = 'An unexpected error occurred';
      console.error('Answer submission error:', e);
      return null;
    } finally {
      loadingAssessments.value = false;
    }
  },

  /**
   * Complete an assessment
   */
  async completeAssessment(assessmentId) {
    loadingAssessments.value = true;
    assessmentError.value = null;
    
    try {
      const response = await apiClient.post(`/assessments/${assessmentId}/complete`);
      
      if (response.error) {
        assessmentError.value = response.message || 'Failed to complete assessment';
        return null;
      }
      
      // Update the current assessment with completion data
      currentAssessment.value = {
        ...currentAssessment.value,
        status: 'completed',
        completedAt: new Date().toISOString(),
        results: response.results
      };
      
      // Add this assessment to the user's assessment list if not already there
      if (!userAssessments.value.find(a => a.id === assessmentId)) {
        userAssessments.value = [...userAssessments.value, currentAssessment.value];
      } else {
        // Update the assessment in the user's list
        userAssessments.value = userAssessments.value.map(a => 
          a.id === assessmentId ? currentAssessment.value : a
        );
      }
      
      return response;
    } catch (e) {
      assessmentError.value = 'An unexpected error occurred';
      console.error('Assessment completion error:', e);
      return null;
    } finally {
      loadingAssessments.value = false;
    }
  },
  
  /**
   * Get available assessment templates
   */
  async getAssessmentTemplates(skillId = null) {
    loadingAssessments.value = true;
    
    try {
      const endpoint = skillId 
        ? `/assessments/templates?skillId=${skillId}` 
        : '/assessments/templates';
        
      const response = await apiClient.get(endpoint);
      
      if (response.error) {
        return [];
      }
      
      return response;
    } catch (e) {
      console.error('Assessment templates fetch error:', e);
      return [];
    } finally {
      loadingAssessments.value = false;
    }
  },

  /**
   * Get assessment history/analytics for a user
   */
  async getUserAssessmentAnalytics(userId) {
    loadingAssessments.value = true;
    
    try {
      const response = await apiClient.get(`/users/${userId}/assessment-analytics`);
      
      if (response.error) {
        return null;
      }
      
      return response;
    } catch (e) {
      console.error('Assessment analytics fetch error:', e);
      return null;
    } finally {
      loadingAssessments.value = false;
    }
  },
  
  /**
   * Reset all assessment data (for logout)
   */
  resetAssessmentData() {
    userAssessments.value = [];
    currentAssessment.value = null;
    assessmentError.value = null;
  }
};

export default assessmentService;