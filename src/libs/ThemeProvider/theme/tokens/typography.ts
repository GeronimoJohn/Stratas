import { ThemeOptions } from '@mui/material/styles'

export const stratasTypography: Required<Pick<ThemeOptions, 'typography'>> = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 800,
      lineHeight: 1.5,
      letterSpacing: '0.015em'
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.01em'
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.01em'
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.005em'
    },
    h5: {
      fontSize: '0.85rem',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '0.005em'
    },
    h6: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '0.005em'
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.01em'
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.01em'
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 300,
      lineHeight: 1.3,
      letterSpacing: '0.005em'
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.05em',
      textTransform: 'none'
    }
  }
}
