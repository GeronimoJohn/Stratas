import { FormEvent, ReactElement, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Pair, PairType } from '@/libs/classSorter'

interface StudentPairsInputProps {
  onAddPair: (pair: Pair, type: PairType) => void
}

export function StudentPairsInput({
  onAddPair
}: StudentPairsInputProps): ReactElement {
  const [student1, setStudent1] = useState('')
  const [student2, setStudent2] = useState('')
  const [pairType, setPairType] = useState<PairType>('conflict')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (student1 && student2 && student1 !== student2) {
      onAddPair([student1, student2], pairType)
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
      <FormControl size="small">
        <InputLabel>Type</InputLabel>
        <Select
          value={pairType}
          onChange={(e) => setPairType(e.target.value as PairType)}
          label="Type"
        >
          <MenuItem value="conflict">Conflict</MenuItem>
          <MenuItem value="pairing">Pairing</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        Add
      </Button>
    </Box>
  )
}
