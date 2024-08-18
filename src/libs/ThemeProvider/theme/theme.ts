import { createTheme, ThemeOptions } from '@mui/material/styles'
import { stratasColors } from './tokens/colors'
import { stratasTypography } from './tokens/typography'
import { stratasComponents } from './tokens/components'

export function getStratasTheme(): Pick<
  ThemeOptions,
  'components' | 'palette' | 'typography' | 'spacing'
> {
  const theme = {
    ...stratasColors,
    ...stratasTypography,
    ...stratasComponents,
    spacing: 4
  }

  return createTheme(theme)
}
