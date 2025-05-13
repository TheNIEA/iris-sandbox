/**
 * Record Manager
 * Utility functions for managing records in localStorage and providing a centralized
 * data management interface for envalumental records.
 */

const STORAGE_KEY = 'userRecords';

/**
 * Get all records from storage
 * @returns {Array} Array of all records
 */
export function getAllRecords() {
  try {
    const storedRecords = localStorage.getItem(STORAGE_KEY);
    return storedRecords ? JSON.parse(storedRecords) : [];
  } catch (error) {
    console.error('Error retrieving records:', error);
    return [];
  }
}

/**
 * Clear all records from storage
 * @returns {boolean} Success status
 */
export function clearAllRecords() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing records:', error);
    return false;
  }
}

/**
 * Save a record to storage
 * @param {Object} record - The record object to save
 * @returns {Object} The saved record
 */
export function saveRecord(record) {
  try {
    const records = getAllRecords();
    
    // Add required metadata
    const recordToSave = {
      ...record,
      id: record.id || `record-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: record.date || new Date().toISOString(),
    };
    
    // Add to records array
    records.push(recordToSave);
    
    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    
    return recordToSave;
  } catch (error) {
    console.error('Error saving record:', error);
    return null;
  }
}

/**
 * Save an assessment record
 * @param {Object} assessment - The assessment data
 * @returns {Object} The saved record
 */
export function saveAssessmentRecord(assessment) {
  const record = {
    type: 'assessment',
    skill: assessment.skill,
    skillId: assessment.skillId,
    icon: assessment.icon,
    category: assessment.category,
    user: assessment.name || 'Anonymous',
    rating: assessment.rating || calculateRating(assessment),
    values: {
      learn: assessment.learnValue,
      apply: assessment.applyValue,
      master: assessment.masterValue
    },
    comment: assessment.comment,
    date: assessment.date || new Date().toISOString()
  };
  
  return saveRecord(record);
}

/**
 * Save a service ticket record
 * @param {Object} ticket - The ticket data
 * @returns {Object} The saved record
 */
export function saveServiceRecord(ticket) {
  const record = {
    type: 'ticket',
    id: ticket.id || Date.now(),
    title: ticket.title,
    user: ticket.user || 'Anonymous',
    status: ticket.status || 'Completed',
    completedDate: ticket.completedDate || formatDate(new Date()),
    value: ticket.value,
    comment: ticket.comment,
    date: ticket.date || new Date().toISOString()
  };
  
  return saveRecord(record);
}

/**
 * Calculate rating from assessment values
 * @param {Object} assessment - The assessment object
 * @returns {Number} The calculated rating (1-5)
 */
function calculateRating(assessment) {
  // Simple algorithm to calculate rating based on assessment values
  // This can be replaced with a more sophisticated algorithm
  if (!assessment.learnValue && !assessment.applyValue && !assessment.masterValue) {
    return 3; // Default middle rating
  }
  
  const totalValue = assessment.learnValue + assessment.applyValue + assessment.masterValue;
  const normalizedRating = (totalValue / 300) * 5; // Assuming 300 is the max total value
  return Math.min(5, Math.max(1, parseFloat(normalizedRating.toFixed(1)))); // Clamp between 1-5
}

/**
 * Format date to a readable string
 * @param {Date} date - The date to format
 * @returns {String} Formatted date string
 */
function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Get combined records with sample data for UI display
 * @param {Array} assessmentSamples - Sample assessment records
 * @param {Array} ticketSamples - Sample ticket records
 * @returns {Array} Combined and sorted records
 */
export function getCombinedRecords(assessmentSamples = [], ticketSamples = []) {
  const storedRecords = getAllRecords();
  
  // Format stored records
  const formattedStoredRecords = storedRecords.map(record => {
    // Format date string properly if it's a date object
    let displayDate = record.date;
    if (typeof record.date === 'string' && record.date.includes('T')) {
      displayDate = new Date(record.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }
    
    return {
      ...record,
      date: displayDate
    };
  });
  
  // Include samples only if we don't have many real records
  const sampleData = formattedStoredRecords.length < 3 
    ? [
        ...assessmentSamples.map(assessment => ({ ...assessment, type: 'assessment' })),
        ...ticketSamples
          .filter(ticket => !formattedStoredRecords.some(r => r.type === 'ticket' && r.id === ticket.id))
          .map(ticket => ({ ...ticket, type: 'ticket' }))
      ] 
    : [];
  
  // Combine all records
  return [
    ...formattedStoredRecords,
    ...sampleData
  ].sort((a, b) => {
    // Sort by date, newest first (handle both string and Date objects)
    const dateA = a.date instanceof Date ? a.date : new Date(a.date);
    const dateB = b.date instanceof Date ? b.date : new Date(b.date);
    return dateB - dateA;
  });
}