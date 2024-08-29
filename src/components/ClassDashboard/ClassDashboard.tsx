'use client'

import { ChangeEvent, ReactElement, useState } from 'react'
import { FileDropzone } from './FileDropzone'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { ClassGroups } from './ClassGroups'
import { StudentInformation } from '@/libs/classSorter'
import { StudentConflicts } from './StudentConflicts'

export function ClassDashboard(): ReactElement {
  const [studentsInformation, setStudentsInformation] =
    useState<StudentInformation[]>()
  const [studentConflicts, setStudentConflicts] = useState<[string, string][]>(
    []
  )
  const [numberOfGroups, setNumberOfGroups] = useState<number>(2)

  const handleNumberOfGroupsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10)
    if (!isNaN(value) && value > 0) {
      setNumberOfGroups(value)
    }
  }

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
      <TextField
        type="number"
        label="Number of Groups"
        value={numberOfGroups}
        onChange={handleNumberOfGroupsChange}
        inputProps={{ min: 1 }}
      />
      <ClassGroups
        studentsInformation={studentsInformation}
        studentConflicts={studentConflicts}
        numberOfGroups={numberOfGroups}
      />
    </Stack>
  )
}
