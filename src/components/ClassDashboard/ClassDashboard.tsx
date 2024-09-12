'use client'

import { ChangeEvent, ReactElement, useState } from 'react'
import { FileDropzone } from './FileDropzone'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { ClassGroups } from './ClassGroups'
import { StudentInformation, StudentPair } from '@/libs/classSorter'
import { StudentPairs } from './StudentConflicts'

export function ClassDashboard(): ReactElement {
  const [studentsInformation, setStudentsInformation] =
    useState<StudentInformation[]>()
  const [studentPairs, setStudentPairs] = useState<StudentPair[]>([])
  const [numberOfGroups, setNumberOfGroups] = useState<number>(2)

  const handleGroupsNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      sx={{ width: '100%' }}
    >
      <Stack
        gap={5}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: 'background.default',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <FileDropzone
          handleStudentsInformation={(data) => setStudentsInformation(data)}
        />
        <TextField
          type="number"
          label="Number of Groups"
          value={numberOfGroups}
          onChange={handleGroupsNumberChange}
          variant="outlined"
          size="small"
          sx={{ width: '30%' }}
        />
        <StudentPairs
          studentPairs={studentPairs}
          setStudentPairs={setStudentPairs}
        />
      </Stack>
      <ClassGroups
        studentsInformation={studentsInformation}
        studentPairs={studentPairs}
        numberOfGroups={numberOfGroups}
      />
    </Stack>
  )
}
