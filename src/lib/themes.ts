export interface Theme {
  id: string
  label: string
  bg: string
  bgPanel: string
  bgInput: string
  textMain: string
  textDim: string
  accentAmber: string   // prompt symbol / primary accent
  accentTeal: string    // section headers / secondary accent
  borderMain: string
  statusOk: string
  statusError: string
  cursorColor: string
  font: {
    family: string      // CSS font-family value
    googleUrl: string   // Google Fonts URL to inject, empty string if already loaded
    label: string       // human-readable name shown in picker
  }
}

export const THEMES: Theme[] = [
  {
    id: 'catppuccin',
    label: 'Catppuccin Mocha',
    bg: '#1e1e2e',
    bgPanel: '#181825',
    bgInput: '#11111b',
    textMain: '#cdd6f4',
    textDim: '#585b70',
    accentAmber: '#fab387',
    accentTeal: '#89dceb',
    borderMain: '#313244',
    statusOk: '#a6e3a1',
    statusError: '#f38ba8',
    cursorColor: '#f5c2e7',
    font: {
      family: "'Fira Code', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap',
      label: 'Fira Code',
    },
  },
  {
    id: 'default',
    label: 'Default (Amber/Teal)',
    bg: '#1c1c1e',
    bgPanel: '#171719',
    bgInput: '#101012',
    textMain: '#e8dcc8',
    textDim: '#6b6b6b',
    accentAmber: '#e5a445',
    accentTeal: '#7fb3a0',
    borderMain: '#2e2e2e',
    statusOk: '#98be65',
    statusError: '#cc5e5e',
    cursorColor: '#e5a445',
    font: {
      family: "'JetBrains Mono', monospace",
      googleUrl: '',  // already loaded globally
      label: 'JetBrains Mono',
    },
  },
  {
    id: 'dracula',
    label: 'Dracula',
    bg: '#282a36',
    bgPanel: '#21222c',
    bgInput: '#191a21',
    textMain: '#f8f8f2',
    textDim: '#6272a4',
    accentAmber: '#ffb86c',
    accentTeal: '#8be9fd',
    borderMain: '#44475a',
    statusOk: '#50fa7b',
    statusError: '#ff5555',
    cursorColor: '#ff79c6',
    font: {
      family: "'Source Code Pro', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap',
      label: 'Source Code Pro',
    },
  },
  {
    id: 'gruvbox',
    label: 'Gruvbox',
    bg: '#282828',
    bgPanel: '#1d2021',
    bgInput: '#141617',
    textMain: '#ebdbb2',
    textDim: '#665c54',
    accentAmber: '#fe8019',
    accentTeal: '#8ec07c',
    borderMain: '#3c3836',
    statusOk: '#b8bb26',
    statusError: '#fb4934',
    cursorColor: '#fabd2f',
    font: {
      family: "'IBM Plex Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap',
      label: 'IBM Plex Mono',
    },
  },
  {
    id: 'nord',
    label: 'Nord',
    bg: '#2e3440',
    bgPanel: '#272c36',
    bgInput: '#1e2229',
    textMain: '#d8dee9',
    textDim: '#4c566a',
    accentAmber: '#ebcb8b',
    accentTeal: '#88c0d0',
    borderMain: '#3b4252',
    statusOk: '#a3be8c',
    statusError: '#bf616a',
    cursorColor: '#81a1c1',
    font: {
      family: "'Inconsolata', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600&display=swap',
      label: 'Inconsolata',
    },
  },
  {
    id: 'tokyo-night',
    label: 'Tokyo Night',
    bg: '#1a1b26',
    bgPanel: '#16161e',
    bgInput: '#0f0f14',
    textMain: '#c0caf5',
    textDim: '#565f89',
    accentAmber: '#e0af68',
    accentTeal: '#7dcfff',
    borderMain: '#292e42',
    statusOk: '#9ece6a',
    statusError: '#f7768e',
    cursorColor: '#bb9af7',
    font: {
      family: "'Space Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap',
      label: 'Space Mono',
    },
  },
  {
    id: 'solarized',
    label: 'Solarized Dark',
    bg: '#002b36',
    bgPanel: '#00212b',
    bgInput: '#001a21',
    textMain: '#839496',
    textDim: '#586e75',
    accentAmber: '#cb4b16',
    accentTeal: '#2aa198',
    borderMain: '#073642',
    statusOk: '#859900',
    statusError: '#dc322f',
    cursorColor: '#b58900',
    font: {
      family: "'Roboto Mono', monospace",
      googleUrl: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600&display=swap',
      label: 'Roboto Mono',
    },
  },
]

export const DEFAULT_THEME_KEY = 'pratik-portfolio-theme'

export const getDefaultTheme = (): Theme => {
  const saved = localStorage.getItem(DEFAULT_THEME_KEY)
  if (saved) {
    const found = THEMES.find((t) => t.id === saved)
    if (found) return found
  }
  return THEMES[0] // catppuccin
}

// cache of already-injected font URLs so we only add each link once
const injectedFonts = new Set<string>()

export const applyTheme = (theme: Theme, root: HTMLElement) => {
  // inject Google Font link if not already present
  if (theme.font.googleUrl && !injectedFonts.has(theme.font.googleUrl)) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = theme.font.googleUrl
    document.head.appendChild(link)
    injectedFonts.add(theme.font.googleUrl)
  }

  root.style.setProperty('--bg-main', theme.bg)
  root.style.setProperty('--bg-panel', theme.bgPanel)
  root.style.setProperty('--bg-input', theme.bgInput)
  root.style.setProperty('--text-main', theme.textMain)
  root.style.setProperty('--text-dim', theme.textDim)
  root.style.setProperty('--accent-amber', theme.accentAmber)
  root.style.setProperty('--accent-teal', theme.accentTeal)
  root.style.setProperty('--border-main', theme.borderMain)
  root.style.setProperty('--status-ok', theme.statusOk)
  root.style.setProperty('--status-error', theme.statusError)
  root.style.setProperty('--cursor-color', theme.cursorColor)
  root.style.setProperty('--font-mono', theme.font.family)
  root.style.fontFamily = theme.font.family
}
