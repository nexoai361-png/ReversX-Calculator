import { themeConfig } from '../utils/data.js';

export class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('calcTheme') || 'vscode-dark';
    this.applyTheme(this.currentTheme);
  }

  applyTheme(themeName) {
    const theme = themeConfig[themeName];
    if (!theme) return;

    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    document.body.className = '';
    if (themeName !== 'vscode-dark') {
      document.body.classList.add('theme-' + themeName.replace('vscode-', ''));
    }

    this.currentTheme = themeName;
    localStorage.setItem('calcTheme', themeName);
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}
