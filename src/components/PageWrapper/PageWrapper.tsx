'use client'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { ThemeProvider } from '@/libs/ThemeProvider'
import { useTheme } from '@mui/material/styles'
import { ReactElement } from 'react'
import { Coffee } from '../Coffee'

const drawerWidth = 280

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps): ReactElement {
  const theme = useTheme()
  return (
    <ThemeProvider>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            '& .MuiDrawer-paper': {
              display: 'flex',
              width: drawerWidth,
              boxSizing: 'border-box',
              flexDirection: 'column',
              backgroundColor: 'background.default',
              borderRight: `2px solid ${theme.palette.background.default}`
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }} />
          <Coffee />
        </Drawer>
        <Box
          component="main"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` }
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
