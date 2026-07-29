/**
 * clientStorage.js — Utility for handling cookies and localStorage
 * Provides a clean interface for saving and retrieving user settings (like PC specs)
 * permanently in the browser without needing a backend login system.
 */

// Save data to both localStorage and a Cookie (1 year expiry)
export const saveUserData = (key, data) => {
  if (typeof window === 'undefined') return;

  try {
    const stringData = JSON.stringify(data);
    
    // Save to localStorage
    localStorage.setItem(key, stringData);
    
    // Save to Cookie (1 year expiry)
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year
    document.cookie = `${key}=${encodeURIComponent(stringData)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  } catch (error) {
    console.warn('Failed to save user data:', error);
  }
};

// Retrieve data (checks Cookie first, then localStorage)
export const getUserData = (key) => {
  if (typeof window === 'undefined') return null;

  try {
    // Check cookie first
    const cookieValue = `; ${document.cookie}`;
    const parts = cookieValue.split(`; ${key}=`);
    let saved = null;
    
    if (parts.length === 2) {
      saved = decodeURIComponent(parts.pop().split(';').shift());
    } else {
      // Fallback to localStorage
      saved = localStorage.getItem(key);
    }

    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn('Failed to parse user data:', error);
  }
  return null;
};

// Clear data from both storage types
export const clearUserData = (key) => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(key);
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=Lax`;
  } catch (error) {
    console.warn('Failed to clear user data:', error);
  }
};
