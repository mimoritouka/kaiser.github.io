// src/lib/stores/theme.js
import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Check for saved theme in localStorage or use system preference
const getInitialTheme = () => {
  if (browser) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

// Create theme store
export const theme = writable(getInitialTheme());

// Subscribe to theme changes and update localStorage and document
if (browser) {
  theme.subscribe(value => {
    localStorage.setItem('theme', value);
    
    // Update document class for CSS theme switching
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
}

// Function to toggle theme
export const toggleTheme = () => {
  theme.update(current => (current === 'light' ? 'dark' : 'light'));
};