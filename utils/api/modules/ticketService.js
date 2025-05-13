/**
 * Ticket Service
 * Handles ticket-related API calls and data management
 */

import { ref, readonly } from 'vue';
import apiClient from '../apiClient';

// Ticket state
const userTickets = ref([]);
const currentTicket = ref(null);
const ticketQueue = ref([]);
const loadingTickets = ref(false);
const ticketError = ref(null);

/**
 * Ticket service with methods for ticket management
 */
export const ticketService = {
  // Expose state as readonly
  userTickets: readonly(userTickets),
  currentTicket: readonly(currentTicket),
  ticketQueue: readonly(ticketQueue),
  loadingTickets: readonly(loadingTickets),
  ticketError: readonly(ticketError),

  /**
   * Get tickets for a user
   */
  async getUserTickets(userId, options = {}) {
    loadingTickets.value = true;
    ticketError.value = null;
    
    try {
      const response = await apiClient.get(`/users/${userId}/tickets`, {
        params: options
      });
      
      if (response.error) {
        ticketError.value = response.message || 'Failed to load tickets';
        return [];
      }
      
      userTickets.value = response;
      return response;
    } catch (e) {
      ticketError.value = 'An unexpected error occurred';
      console.error('Tickets fetch error:', e);
      return [];
    } finally {
      loadingTickets.value = false;
    }
  },

  /**
   * Get a specific ticket by ID
   */
  async getTicketById(ticketId) {
    loadingTickets.value = true;
    ticketError.value = null;
    
    try {
      const response = await apiClient.get(`/tickets/${ticketId}`);
      
      if (response.error) {
        ticketError.value = response.message || 'Failed to load ticket';
        return null;
      }
      
      currentTicket.value = response;
      return response;
    } catch (e) {
      ticketError.value = 'An unexpected error occurred';
      console.error(`Ticket ${ticketId} fetch error:`, e);
      return null;
    } finally {
      loadingTickets.value = false;
    }
  },

  /**
   * Get the ticket queue
   */
  async getTicketQueue(options = {}) {
    loadingTickets.value = true;
    
    try {
      const response = await apiClient.get('/tickets/queue', {
        params: options
      });
      
      if (response.error) {
        return [];
      }
      
      ticketQueue.value = response;
      return response;
    } catch (e) {
      console.error('Ticket queue fetch error:', e);
      return [];
    } finally {
      loadingTickets.value = false;
    }
  },

  /**
   * Create a new ticket
   */
  async createTicket(ticketData) {
    loadingTickets.value = true;
    ticketError.value = null;
    
    try {
      const response = await apiClient.post('/tickets', ticketData);
      
      if (response.error) {
        ticketError.value = response.message || 'Failed to create ticket';
        return null;
      }
      
      // Add to user tickets if this ticket belongs to the current user
      if (ticketData.userId) {
        userTickets.value = [...userTickets.value, response];
      }
      
      return response;
    } catch (e) {
      ticketError.value = 'An unexpected error occurred';
      console.error('Ticket creation error:', e);
      return null;
    } finally {
      loadingTickets.value = false;
    }
  },

  /**
   * Update a ticket
   */
  async updateTicket(ticketId, ticketData) {
    loadingTickets.value = true;
    ticketError.value = null;
    
    try {
      const response = await apiClient.put(`/tickets/${ticketId}`, ticketData);
      
      if (response.error) {
        ticketError.value = response.message || 'Failed to update ticket';
        return null;
      }
      
      // Update current ticket if we're viewing this ticket
      if (currentTicket.value && currentTicket.value.id === ticketId) {
        currentTicket.value = { ...currentTicket.value, ...response };
      }
      
      // Update in user tickets list if present
      if (userTickets.value.length > 0) {
        userTickets.value = userTickets.value.map(ticket => 
          ticket.id === ticketId ? { ...ticket, ...response } : ticket
        );
      }
      
      // Update in queue if present
      if (ticketQueue.value.length > 0) {
        ticketQueue.value = ticketQueue.value.map(ticket => 
          ticket.id === ticketId ? { ...ticket, ...response } : ticket
        );
      }
      
      return response;
    } catch (e) {
      ticketError.value = 'An unexpected error occurred';
      console.error(`Ticket ${ticketId} update error:`, e);
      return null;
    } finally {
      loadingTickets.value = false;
    }
  },

  /**
   * Assign a ticket to a user
   */
  async assignTicket(ticketId, userId) {
    return this.updateTicket(ticketId, { assignedUserId: userId });
  },

  /**
   * Change ticket status
   */
  async changeTicketStatus(ticketId, status) {
    return this.updateTicket(ticketId, { status });
  },

  /**
   * Add a comment to a ticket
   */
  async addTicketComment(ticketId, commentData) {
    loadingTickets.value = true;
    
    try {
      const response = await apiClient.post(`/tickets/${ticketId}/comments`, commentData);
      
      if (response.error) {
        return null;
      }
      
      // Update current ticket comments if we're viewing this ticket
      if (currentTicket.value && currentTicket.value.id === ticketId) {
        currentTicket.value = { 
          ...currentTicket.value, 
          comments: [...(currentTicket.value.comments || []), response]
        };
      }
      
      return response;
    } catch (e) {
      console.error(`Ticket ${ticketId} comment error:`, e);
      return null;
    } finally {
      loadingTickets.value = false;
    }
  },

  /**
   * Get ticket statistics
   */
  async getTicketStatistics() {
    try {
      const response = await apiClient.get('/tickets/statistics');
      
      if (response.error) {
        return null;
      }
      
      return response;
    } catch (e) {
      console.error('Ticket statistics error:', e);
      return null;
    }
  },

  /**
   * Reset ticket data (for logout)
   */
  resetTicketData() {
    userTickets.value = [];
    currentTicket.value = null;
    ticketQueue.value = [];
    ticketError.value = null;
  }
};

export default ticketService;