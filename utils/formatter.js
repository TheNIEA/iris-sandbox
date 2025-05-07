/**
 * Formats a number with commas as thousands separators
 * @param {number|string} num - The number to format
 * @param {boolean} forceParse - Force parsing the input as an integer (default: true)
 * @returns {string} The formatted number
 */
export const formatNumber = (num, forceParse = true) => {
  if (forceParse && typeof num === 'string') {
    num = parseInt(num, 10);
  }
  
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Formats a currency amount with a dollar sign and thousand separators
 * @param {number|string} amount - The amount to format
 * @param {string} currencySymbol - Currency symbol to use (default: '$')
 * @returns {string} The formatted currency amount
 */
export const formatCurrency = (amount, currencySymbol = '$') => {
  return `${currencySymbol}${formatNumber(amount)}`;
};

/**
 * Converts a numeric rating (0-5) to a letter grade (A-F)
 * @param {number} rating - The rating value (0-5)
 * @returns {string} The corresponding letter grade
 */
export const convertToLetterGrade = (rating) => {
  if (rating >= 4.5) return 'A';
  if (rating >= 3.5) return 'B';
  if (rating >= 2.5) return 'C';
  if (rating >= 1.5) return 'D';
  return 'F';
};

/**
 * Formats a date to a localized string representation
 * @param {Date|string} date - The date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} The formatted date
 */
export const formatDate = (date, options = { month: 'long', day: 'numeric', year: 'numeric' }) => {
  if (typeof date === 'string' && date.includes('T')) {
    date = new Date(date);
  } else if (typeof date === 'string') {
    return date; // Return as is if it's already a formatted string
  }
  
  return new Date(date).toLocaleDateString('en-US', options);
};