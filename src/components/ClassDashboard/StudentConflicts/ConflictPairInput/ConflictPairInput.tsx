import { FormEvent, ReactElement, useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { StudentPair } from '../StudentConflicts'

interface ConflictPairInputProps {
  onAddConflict: (conflict: StudentPair) => void
}

export function ConflictPairInput({
  onAddConflict
}: ConflictPairInputProps): ReactElement {
  const [student1, setStudent1] = useState('')
  const [student2, setStudent2] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (student1 && student2 && student1 !== student2) {
      onAddConflict([student1, student2])
      setStudent1('')
      setStudent2('')
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mb: 2, display: 'flex', gap: 2 }}
    >
      <TextField
        value={student1}
        onChange={(e) => setStudent1(e.target.value)}
        label="Student 1"
        variant="outlined"
        size="small"
        required
      />
      <TextField
        value={student2}
        onChange={(e) => setStudent2(e.target.value)}
        label="Student 2"
        variant="outlined"
        size="small"
        required
      />
      <Button type="submit" variant="contained">
        Add
      </Button>
    </Box>
  )
}
