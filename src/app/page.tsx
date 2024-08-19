import { FileDropzone } from '@/components/FileDropzone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ReactElement } from 'react'

export default function Page(): ReactElement {
  return (
    <Box
      sx={{
        pt: 20,
        gap: 10,
        height: '100vh',
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
      <FileDropzone />
    </Box>
  )
}
