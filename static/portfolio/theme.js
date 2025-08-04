// Theme management system with accessibility and persistence
class ThemeManager {
  constructor() {
    this.themeKey = 'portfolio-theme';
    this.init();
  }

  // Initialize theme system
  init() {
    this.setInitialTheme();
    this.bindToggleButton();
    this.watchSystemPreference();
  }

  // Set initial theme based on saved preference or system preference
  setInitialTheme() {
    const savedTheme = localStorage.getItem(this.themeKey);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let theme;
    if (savedTheme) {
      theme = savedTheme;
    } else {
      theme = systemPrefersDark ? 'dark' : 'light';
    }
    
    this.applyTheme(theme);
  }

  // Apply theme to document
  applyTheme(theme) {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    
    // Update toggle button text and aria-label for accessibility
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      const isDark = theme === 'dark';
      toggleButton.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i> ${isDark ? 'Light' : 'Dark'} Mode`;
      toggleButton.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    }
    
    // Save preference
    localStorage.setItem(this.themeKey, theme);
  }

  // Toggle between themes
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  // Bind click event to toggle button
  bindToggleButton() {
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });
    }
  }

  // Watch for system preference changes
  watchSystemPreference() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedTheme = localStorage.getItem(this.themeKey);
      if (!savedTheme) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});