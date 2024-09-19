import { Dispatch, ReactElement, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { PairList } from './PairList'
import { StudentPairsInput } from './StudentPairsInput'
import { Pair, PairType, StudentPair } from '@/libs/classSorter'

interface StudentPairsProps {
  studentPairs: StudentPair[]
  setStudentPairs: Dispatch<SetStateAction<StudentPair[]>>
}

export function StudentPairs({
  studentPairs,
  setStudentPairs
}: StudentPairsProps): ReactElement {
  function onAddPair(newPair: Pair, type: PairType): void {
    setStudentPairs([...studentPairs, { pair: newPair, type }])
  }

  function onRemovePair(index: number): void {
    setStudentPairs(studentPairs.filter((_, i) => i !== index))
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Student Conflicts and Pairs
      </Typography>
      <StudentPairsInput onAddPair={onAddPair} />
      <PairList pairs={studentPairs} onRemovePair={onRemovePair} />
    </Box>
  )
}
