// Utility functions for local storage

/**
 * Save data to local storage
 * @param key The key to store the data under
 * @param data The data to store
 */
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Get data from local storage
 * @param key The key to retrieve data from
 * @param defaultValue Default value if the key doesn't exist
 * @returns The stored data or default value
 */
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove data from local storage
 * @param key The key to remove
 */
export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};
