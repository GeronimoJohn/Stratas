'use client'

import { ReactElement, useCallback, useState } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = ['.csv', '.xls', '.xlsx']

export function FileDropzone(): ReactElement {
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setFileRejections(fileRejections)
      console.log('Accepted files:', acceptedFiles)
    },
    []
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES.reduce(
      (acc, type) => ({ ...acc, [type]: [] }),
      {}
    ),
    maxSize: MAX_FILE_SIZE
  })

  return (
    <Stack
      gap={2}
      sx={{
        p: 4,
        width: 600,
        borderRadius: 2,
        backgroundColor: 'background.default',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          border: '3px dashed',
          borderColor: isDragActive ? 'primary.main' : 'text.secondary',
          backgroundColor: 'background.paper',
          transition: 'border-color 0.2s ease-in-out'
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Typography>
          {isDragActive
            ? 'Drop the files here...'
            : "Drag 'n' drop some files here, or click to select files"}
        </Typography>
      </Box>
      {fileRejections.length > 0 && (
        <Alert severity="error">
          {fileRejections.map(({ file, errors }) => (
            <Box key={file.name}>
              {file.name} - {errors.map((e) => e.message).join(', ')}
            </Box>
          ))}
        </Alert>
      )}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
      >
        <Typography variant="body2">Accepted Files: </Typography>
        <Stack direction="row" spacing={1}>
          {ACCEPTED_FILE_TYPES.map((type) => (
            <Chip key={type} label={type} color="warning" size="small" />
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
