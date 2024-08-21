'use client'

import { ReactElement, useState } from 'react'
import { FileDropzone } from './FileDropzone'
import Stack from '@mui/material/Stack'
import { ClassGroups } from './ClassGroups'
import { StudentInformation } from '@/libs/classSorter'

export function ClassDashboard(): ReactElement {
  const [studentsInformation, setStudentsInformation] =
    useState<StudentInformation[]>()

  return (
    <Stack
      gap={5}
      justifyItems="center"
      alignItems="center"
      sx={{
        width: '100%'
      }}
    >
      <FileDropzone
        handleStudentsInformation={(data) => setStudentsInformation(data)}
      />
      <ClassGroups studentsInformation={studentsInformation} />
    </Stack>
  )
}
