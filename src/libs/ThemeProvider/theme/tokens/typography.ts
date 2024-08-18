import { ThemeOptions } from '@mui/material/styles'

export const stratasTypography: Required<Pick<ThemeOptions, 'typography'>> = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600
    },
    body1: {
      fontSize: '1rem'
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  }
}
