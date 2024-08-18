import { ThemeOptions } from '@mui/material/styles'

export const stratasColors = (): Required<Pick<ThemeOptions, 'palette'>> => {
  return {
    palette: {
      primary: {
        main: '#1E8D6E',
        light: '#2AB38A',
        dark: '#166B53'
      },
      secondary: {
        main: '#F5A623'
      },
      background: {
        default: '#FFFFFF',
        paper: '#F5F5F5'
      },
      text: {
        primary: '#333333',
        secondary: '#666666'
      },
      error: {
        main: '#EB5757'
      },
      warning: {
        main: '#F2C94C'
      },
      success: {
        main: '#27AE60'
      }
    }
  }
}
