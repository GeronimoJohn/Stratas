'use client'

import { ReactElement } from 'react'
import { useDropzone } from 'react-dropzone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'

export function FileDropzone(): ReactElement {
  const { getRootProps, getInputProps } = useDropzone()

  return (
    <Stack
      gap={5}
      sx={{
        p: 4,
        height: 200,
        width: 600,
        borderRadius: 2,
        backgroundColor: 'background.default',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box
        sx={{
          p: 4,
          pb: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          border: '3px dashed #726f6f',
          backgroundColor: 'background.paper'
        }}
      >
        <Box {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </Box>
      </Box>
      <Stack
        gap={2}
        direction="row"
        alignSelf="flex-end"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 'auto' }}
      >
        <Typography variant="h4">Accepted Files: </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            '& .MuiChip-root': {
              backgroundColor: 'warning.main',
              color: 'text.primary'
            }
          }}
        >
          <Chip label=".csv" />
          <Chip label=".xls" />
        </Stack>
      </Stack>
    </Stack>
  )
}
