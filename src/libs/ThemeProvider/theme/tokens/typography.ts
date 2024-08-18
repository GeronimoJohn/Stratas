import { ThemeOptions } from '@mui/material/styles'

export const stratasTypography: Required<Pick<ThemeOptions, 'typography'>> = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 800,
      lineHeight: 1.5,
      letterSpacing: '0.015em',
      margin: '0 0 1rem 0'
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
      margin: '0 0 0.75rem 0'
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.01em',
      margin: '0 0 0.5rem 0'
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: '0.005em',
      margin: '0 0 0.5rem 0'
    },
    h5: {
      fontSize: '0.85rem',
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '0.005em',
      margin: '0 0 0.25rem 0'
    },
    h6: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '0.005em',
      margin: '0 0 0.25rem 0'
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
      margin: '0 0 1rem 0'
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
      margin: '0 0 0.75rem 0'
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 300,
      lineHeight: 1.3,
      letterSpacing: '0.005em',
      margin: '0 0 0.5rem 0'
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.05em',
      textTransform: 'none',
      margin: '0'
    }
  }
}
