/**
 * Community Service
 * Handles community-related API calls and data management
 */

import { ref, readonly } from 'vue';
import apiClient from '../apiClient';

// Community state
const communities = ref([]);
const currentCommunity = ref(null);
const communityMembers = ref([]);
const communityPosts = ref([]);
const loadingCommunity = ref(false);
const communityError = ref(null);

/**
 * Community service with methods for community management
 */
export const communityService = {
  // Expose state as readonly
  communities: readonly(communities),
  currentCommunity: readonly(currentCommunity),
  communityMembers: readonly(communityMembers),
  communityPosts: readonly(communityPosts),
  loadingCommunity: readonly(loadingCommunity),
  communityError: readonly(communityError),
  
  /**
   * Get all available communities
   */
  async getAllCommunities(options = {}) {
    loadingCommunity.value = true;
    communityError.value = null;
    
    try {
      const response = await apiClient.get('/communities', { 
        params: options
      });
      
      if (response.error) {
        communityError.value = response.message || 'Failed to load communities';
        return [];
      }
      
      communities.value = response;
      return response;
    } catch (e) {
      communityError.value = 'An unexpected error occurred';
      console.error('Communities fetch error:', e);
      return [];
    } finally {
      loadingCommunity.value = false;
    }
  },
  
  /**
   * Get a specific community by ID or slug
   */
  async getCommunity(communityId) {
    loadingCommunity.value = true;
    communityError.value = null;
    
    try {
      const response = await apiClient.get(`/communities/${communityId}`);
      
      if (response.error) {
        communityError.value = response.message || 'Failed to load community';
        return null;
      }
      
      currentCommunity.value = response;
      return response;
    } catch (e) {
      communityError.value = 'An unexpected error occurred';
      console.error('Community fetch error:', e);
      return null;
    } finally {
      loadingCommunity.value = false;
    }
  },
  
  /**
   * Get members of a community
   */
  async getCommunityMembers(communityId, options = {}) {
    loadingCommunity.value = true;
    
    try {
      const response = await apiClient.get(`/communities/${communityId}/members`, {
        params: options
      });
      
      if (response.error) {
        return [];
      }
      
      communityMembers.value = response;
      return response;
    } catch (e) {
      console.error('Community members fetch error:', e);
      return [];
    } finally {
      loadingCommunity.value = false;
    }
  },
  
  /**
   * Get community posts/discussions
   */
  async getCommunityPosts(communityId, options = {}) {
    loadingCommunity.value = true;
    
    try {
      const response = await apiClient.get(`/communities/${communityId}/posts`, {
        params: options
      });
      
      if (response.error) {
        return [];
      }
      
      communityPosts.value = response;
      return response;
    } catch (e) {
      console.error('Community posts fetch error:', e);
      return [];
    } finally {
      loadingCommunity.value = false;
    }
  },
  
  /**
   * Create a new post in a community
   */
  async createCommunityPost(communityId, postData) {
    loadingCommunity.value = true;
    communityError.value = null;
    
    try {
      const response = await apiClient.post(`/communities/${communityId}/posts`, postData);
      
      if (response.error) {
        communityError.value = response.message || 'Failed to create post';
        return null;
      }
      
      // Add the new post to our local cache if we're viewing this community
      if (currentCommunity.value?.id === communityId) {
        communityPosts.value = [response, ...communityPosts.value];
      }
      
      return response;
    } catch (e) {
      communityError.value = 'An unexpected error occurred';
      console.error('Post creation error:', e);
      return null;
    } finally {
      loadingCommunity.value = false;
    }
  },
  
  /**
   * Join a community
   */
  async joinCommunity(communityId, userData = {}) {
    loadingCommunity.value = true;
    communityError.value = null;
    
    try {
      const response = await apiClient.post(`/communities/${communityId}/join`, userData);
      
      if (response.error) {
        communityError.value = response.message || 'Failed to join community';
        return false;
      }
      
      // Update our local cache if we're viewing this community
      if (currentCommunity.value?.id === communityId) {
        currentCommunity.value = {
          ...currentCommunity.value,
          memberCount: (currentCommunity.value.memberCount || 0) + 1,
          isMember: true
        };
      }
      
      return true;
    } catch (e) {
      communityError.value = 'An unexpected error occurred';
      console.error('Community join error:', e);
      return false;
    } finally {
      loadingCommunity.value = false;
    }
  },
  
  /**
   * Leave a community
   */
  async leaveCommunity(communityId) {
    loadingCommunity.value = true;
    communityError.value = null;
    
    try {
      const response = await apiClient.post(`/communities/${communityId}/leave`);
      
      if (response.error) {
        communityError.value = response.message || 'Failed to leave community';
        return false;
      }
      
      // Update our local cache if we're viewing this community
      if (currentCommunity.value?.id === communityId) {
        currentCommunity.value = {
          ...currentCommunity.value,
          memberCount: Math.max(0, (currentCommunity.value.memberCount || 1) - 1),
          isMember: false
        };
      }
      
      return true;
    } catch (e) {
      communityError.value = 'An unexpected error occurred';
      console.error('Community leave error:', e);
      return false;
    } finally {
      loadingCommunity.value = false;
    }
  },
  
  /**
   * Get recommended communities for a user
   */
  async getRecommendedCommunities(userId) {
    loadingCommunity.value = true;
    
    try {
      const response = await apiClient.get(`/users/${userId}/recommended-communities`);
      
      if (response.error) {
        return [];
      }
      
      return response;
    } catch (e) {
      console.error('Recommended communities fetch error:', e);
      return [];
    } finally {
      loadingCommunity.value = false;
    }
  },
  
  /**
   * Create a new community (for privileged users)
   */
  async createCommunity(communityData) {
    loadingCommunity.value = true;
    communityError.value = null;
    
    try {
      const response = await apiClient.post('/communities', communityData);
      
      if (response.error) {
        communityError.value = response.message || 'Failed to create community';
        return null;
      }
      
      // Add to our communities list
      communities.value = [...communities.value, response];
      
      return response;
    } catch (e) {
      communityError.value = 'An unexpected error occurred';
      console.error('Community creation error:', e);
      return null;
    } finally {
      loadingCommunity.value = false;
    }
  },
  
  /**
   * Reset community data (for logout or changing context)
   */
  resetCommunityData() {
    communities.value = [];
    currentCommunity.value = null;
    communityMembers.value = [];
    communityPosts.value = [];
    communityError.value = null;
  }
};

export default communityService;