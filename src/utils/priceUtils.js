/**
 * Utility functions for price formatting and display
 */

/**
 * Format price for display - shows "Free" for 0 or null prices
 * @param {number|string} price - The price value
 * @param {boolean} showCurrency - Whether to show currency symbol for non-zero prices
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, showCurrency = true) => {
  // Convert to number if it's a string
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  // Check if price is 0, null, undefined, or NaN
  if (!numPrice || numPrice === 0 || isNaN(numPrice)) {
    return 'Free';
  }
  
  // Format the price with currency symbol if requested
  if (showCurrency) {
    return `$${numPrice.toFixed(2)}`;
  }
  
  return numPrice.toFixed(2);
};

/**
 * Check if a price should be displayed as free
 * @param {number|string} price - The price value
 * @returns {boolean} True if price should be displayed as "Free"
 */
export const isFreePrice = (price) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return !numPrice || numPrice === 0 || isNaN(numPrice);
};

/**
 * Get price display class for styling
 * @param {number|string} price - The price value
 * @returns {string} CSS class name for price styling
 */
export const getPriceClass = (price) => {
  return isFreePrice(price) ? 'free-price' : 'paid-price';
};