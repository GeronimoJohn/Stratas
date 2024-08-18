import { createTheme, ThemeOptions } from '@mui/material/styles'
import { stratasColors } from './tokens/colors'
import { stratasTypography } from './tokens/typography'
import { stratasComponents } from './tokens/components'

export function getStratasTheme(): Pick<
  ThemeOptions,
  'components' | 'palette' | 'typography'
> {
  // return the colors in object not as function
  const theme = {
    ...stratasColors,
    ...stratasTypography,
    ...stratasComponents
  }

  return createTheme(theme)
}
