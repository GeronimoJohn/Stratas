'use client'

import { ReactElement, useCallback, useState } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import { parse, ParseResult } from 'papaparse'
import { StudentInformation } from '@/libs/classSorter'

interface FileDropZoneProps {
  handleStudentsInformation: (studentsInformation: StudentInformation[]) => void
}

export function FileDropzone({
  handleStudentsInformation
}: FileDropZoneProps): ReactElement {
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([])

  function processFileData(file: File) {
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const result = reader.result as string
      parse(result, {
        header: true,
        dynamicTyping: true,
        complete: (results: ParseResult<StudentInformation>) => {
          handleStudentsInformation(results.data)
        }
      })
    }
    reader.readAsText(file)
  }

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setFileRejections(fileRejections)
      acceptedFiles.forEach((file) => {
        processFileData(file)
      })
    },
    []
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxSize: 5 * 1024 * 1024
  })

  return (
    <Stack gap={2} sx={{ width: '100%' }}>
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
          <Chip label=".csv" color="warning" />
        </Stack>
      </Stack>
    </Stack>
  )
}
