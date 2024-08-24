'use client'

import { ReactElement, useState } from 'react'
import { FileDropzone } from './FileDropzone'
import Stack from '@mui/material/Stack'
import { ClassGroups } from './ClassGroups'
import { StudentInformation } from '@/libs/classSorter'
import { StudentConflicts } from './StudentConflicts'

export function ClassDashboard(): ReactElement {
  const [studentsInformation, setStudentsInformation] =
    useState<StudentInformation[]>()
  const [studentConflicts, setStudentConflicts] = useState<[string, string][]>(
    []
  )

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
      <StudentConflicts
        studentConflicts={studentConflicts}
        setStudentConflicts={setStudentConflicts}
      />
      <ClassGroups
        studentsInformation={studentsInformation}
        studentConflicts={studentConflicts}
      />
    </Stack>
  )
}
