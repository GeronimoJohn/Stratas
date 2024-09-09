import { Dispatch, ReactElement, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { ConflictPairInput } from './ConflictPairInput'
import { ConflictList } from './ConflictList'

export type StudentPair = [string, string]

interface StudentConflictsProps {
  studentConflicts: StudentPair[]
  setStudentConflicts: Dispatch<SetStateAction<StudentPair[]>>
}

export function StudentConflicts({
  studentConflicts,
  setStudentConflicts
}: StudentConflictsProps): ReactElement {
  const handleAddConflict = (newConflict: StudentPair) => {
    setStudentConflicts([...studentConflicts, newConflict])
  }

  const handleRemoveConflict = (index: number) => {
    setStudentConflicts(studentConflicts.filter((_, i) => i !== index))
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Student Conflicts
      </Typography>
      <ConflictPairInput onAddConflict={handleAddConflict} />
      <ConflictList
        conflicts={studentConflicts}
        onRemoveConflict={handleRemoveConflict}
      />
    </Box>
  )
}
