export const conversionData = {
  length: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 },
  weight: { mg: 0.001, g: 1, kg: 1000, ton: 1000000, oz: 28.3495, lb: 453.592, stone: 6350.29 },
  area: { sqm: 1, sqkm: 1000000, sqft: 0.092903, acre: 4046.86, ha: 10000 },
  speed: { kmh: 1, ms: 3.6, mph: 1.60934, knot: 1.852 },
  volume: { ml: 1, l: 1000, gal: 3785.41, cup: 236.588 },
  energy: { j: 1, kj: 1000, cal: 4.184, kcal: 4184, kwh: 3600000 },
  pressure: { pa: 1, bar: 100000, psi: 6894.76, atm: 101325 },
  data: { bit: 0.125, byte: 1, kb: 1024, mb: 1048576, gb: 1073741824, tb: 1099511627776 },
  time: { ms: 0.001, s: 1, min: 60, hr: 3600, day: 86400, week: 604800, month: 2592000, year: 31536000 },
  currency: { USD: 1, EUR: 1.09, GBP: 1.27, INR: 0.012, JPY: 0.0067, CAD: 0.74, AUD: 0.65, CNY: 0.14 }
};

export const themeConfig = {
  'vscode-dark': {
    '--bg-primary': '#1e1e1e',
    '--bg-secondary': '#252526',
    '--bg-tertiary': '#2d2d30',
    '--bg-hover': '#3e3e42',
    '--bg-active': '#094771',
    '--bg-input': '#3c3c3c',
    '--text-primary': '#cccccc',
    '--text-secondary': '#858585',
    '--text-active': '#ffffff',
    '--accent': '#007acc',
    '--accent-hover': '#1a8ad4',
    '--accent-muted': 'rgba(0, 122, 204, 0.2)',
    '--border': '#3e3e42',
    '--border-focus': '#007acc'
  },
  'vscode-light': {
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f3f3f3',
    '--bg-tertiary': '#e5e5e5',
    '--bg-hover': '#d0d0d0',
    '--bg-active': '#0060c0',
    '--bg-input': '#ffffff',
    '--text-primary': '#333333',
    '--text-secondary': '#666666',
    '--text-active': '#000000',
    '--accent': '#007acc',
    '--accent-hover': '#005a9e',
    '--accent-muted': 'rgba(0, 122, 204, 0.2)',
    '--border': '#cccccc',
    '--border-focus': '#007acc'
  },
  'monokai': {
    '--bg-primary': '#272822',
    '--bg-secondary': '#1e1f1c',
    '--bg-tertiary': '#3e3d32',
    '--bg-hover': '#49483e',
    '--bg-active': '#a6e22e',
    '--bg-input': '#3e3d32',
    '--text-primary': '#f8f8f2',
    '--text-secondary': '#75715e',
    '--text-active': '#f92672',
    '--accent': '#f92672',
    '--accent-hover': '#ff4689',
    '--accent-muted': 'rgba(249, 38, 114, 0.2)',
    '--border': '#49483e',
    '--border-focus': '#a6e22e'
  },
  'onedark': {
    '--bg-primary': '#282c34',
    '--bg-secondary': '#21252b',
    '--bg-tertiary': '#21252b',
    '--bg-hover': '#3e4451',
    '--bg-active': '#61afef',
    '--bg-input': '#1b1d23',
    '--text-primary': '#abb2bf',
    '--text-secondary': '#5c6370',
    '--text-active': '#61afef',
    '--accent': '#61afef',
    '--accent-hover': '#4fa0e0',
    '--accent-muted': 'rgba(97, 175, 239, 0.2)',
    '--border': '#3b4048',
    '--border-focus': '#61afef'
  }
};
