import { ThemeOptions } from '@mui/material/styles'

export const stratasComponents: Required<Pick<ThemeOptions, 'components'>> = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none'
        }
      },
      defaultProps: {
        disableRipple: true
      },
      variants: [
        {
          props: {
            size: 'large'
          },
          style: {
            minHeight: '42px',
            borderRadius: '16px',
            fontWeight: 700
          }
        },
        {
          props: { size: 'medium' },
          style: {
            minHeight: '36.5px',
            borderRadius: '12px',
            fontWeight: 700
          }
        },
        {
          props: { size: 'small' },
          style: {
            minHeight: '30.75px',
            borderRadius: '8px'
          }
        }
      ]
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontSize: '0.8rem',
          fontWeight: 600
        }
      }
    }
  }
}
