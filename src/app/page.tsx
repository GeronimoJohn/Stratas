import { ClassDashboard } from '@/components/ClassDashboard'
import { FileDropzone } from '@/components/ClassDashboard/FileDropzone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ReactElement } from 'react'

export default function Page(): ReactElement {
  return (
    <Box
      sx={{
        p: 20,
        gap: 10,
        minHeight: '100vh',
        overflow: 'auto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'background.paper'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h1">Stratas</Typography>
        <Typography variant="h4">
          Inspired by strata, representing different levels or layers
        </Typography>
      </Box>
      <ClassDashboard />
    </Box>
  )
}
