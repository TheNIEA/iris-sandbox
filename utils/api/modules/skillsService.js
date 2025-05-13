/**
 * Skills Service
 * Handles skills-related API calls and data management
 */

import { ref, readonly, computed } from 'vue';
import apiClient from '../apiClient';

// Skills state
const allSkills = ref([]);
const skillCategories = ref([]);
const loadingSkills = ref(false);
const skillsError = ref(null);

// Computed property to organize skills by category
const skillsByCategory = computed(() => {
  const categorized = {};
  
  allSkills.value.forEach(skill => {
    const categoryId = skill.categoryId || 'uncategorized';
    
    if (!categorized[categoryId]) {
      categorized[categoryId] = [];
    }
    
    categorized[categoryId].push(skill);
  });
  
  return categorized;
});

/**
 * Skills service with methods for skills management
 */
export const skillsService = {
  // Expose state as readonly
  allSkills: readonly(allSkills),
  skillCategories: readonly(skillCategories),
  loadingSkills: readonly(loadingSkills),
  skillsError: readonly(skillsError),
  skillsByCategory,

  /**
   * Get all available skills
   */
  async getAllSkills(forceRefresh = false) {
    // Return cached data if available and not forcing refresh
    if (allSkills.value.length > 0 && !forceRefresh) {
      return allSkills.value;
    }
    
    loadingSkills.value = true;
    skillsError.value = null;
    
    try {
      const response = await apiClient.get('/skills');
      
      if (response.error) {
        skillsError.value = response.message || 'Failed to load skills';
        return [];
      }
      
      allSkills.value = response;
      return response;
    } catch (e) {
      skillsError.value = 'An unexpected error occurred';
      console.error('Skills fetch error:', e);
      return [];
    } finally {
      loadingSkills.value = false;
    }
  },

  /**
   * Get all skill categories
   */
  async getSkillCategories() {
    // Return cached data if available
    if (skillCategories.value.length > 0) {
      return skillCategories.value;
    }
    
    loadingSkills.value = true;
    
    try {
      const response = await apiClient.get('/skills/categories');
      
      if (response.error) {
        return [];
      }
      
      skillCategories.value = response;
      return response;
    } catch (e) {
      console.error('Skill categories fetch error:', e);
      return [];
    } finally {
      loadingSkills.value = false;
    }
  },

  /**
   * Get a specific skill by ID
   */
  async getSkillById(skillId) {
    // Check if we already have this skill in our cache
    const cachedSkill = allSkills.value.find(s => s.id === skillId);
    if (cachedSkill) return cachedSkill;
    
    loadingSkills.value = true;
    
    try {
      const response = await apiClient.get(`/skills/${skillId}`);
      
      if (response.error) {
        return null;
      }
      
      return response;
    } catch (e) {
      console.error(`Skill ${skillId} fetch error:`, e);
      return null;
    } finally {
      loadingSkills.value = false;
    }
  },

  /**
   * Search skills by name or description
   */
  async searchSkills(query) {
    loadingSkills.value = true;
    
    try {
      const response = await apiClient.get('/skills/search', {
        params: { q: query }
      });
      
      if (response.error) {
        return [];
      }
      
      return response;
    } catch (e) {
      console.error('Skills search error:', e);
      return [];
    } finally {
      loadingSkills.value = false;
    }
  },

  /**
   * Get recommended skills based on user profile/existing skills
   */
  async getRecommendedSkills(profileId) {
    loadingSkills.value = true;
    
    try {
      const response = await apiClient.get(`/profiles/${profileId}/recommended-skills`);
      
      if (response.error) {
        return [];
      }
      
      return response;
    } catch (e) {
      console.error('Recommended skills fetch error:', e);
      return [];
    } finally {
      loadingSkills.value = false;
    }
  },

  /**
   * Add a new skill (for admin use)
   */
  async addSkill(skillData) {
    try {
      const response = await apiClient.post('/skills', skillData);
      
      if (response.error) {
        return { error: response.message, data: null };
      }
      
      // Update our local cache
      allSkills.value = [...allSkills.value, response];
      
      return { data: response, error: null };
    } catch (e) {
      console.error('Skill creation error:', e);
      return { error: 'An unexpected error occurred', data: null };
    }
  },

  /**
   * Update a skill (for admin use)
   */
  async updateSkill(skillId, skillData) {
    try {
      const response = await apiClient.put(`/skills/${skillId}`, skillData);
      
      if (response.error) {
        return { error: response.message, data: null };
      }
      
      // Update our local cache
      if (allSkills.value.length > 0) {
        allSkills.value = allSkills.value.map(skill => 
          skill.id === skillId ? { ...skill, ...response } : skill
        );
      }
      
      return { data: response, error: null };
    } catch (e) {
      console.error('Skill update error:', e);
      return { error: 'An unexpected error occurred', data: null };
    }
  },

  /**
   * Clear all skills data from the cache
   */
  clearSkillsCache() {
    allSkills.value = [];
    skillCategories.value = [];
  }
};

export default skillsService;