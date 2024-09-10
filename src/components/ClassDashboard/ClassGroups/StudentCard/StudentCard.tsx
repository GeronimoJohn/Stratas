import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'

import { ReactElement } from 'react'

import { GroupedStudent } from '@/libs/classSorter'

interface StudentCardProps {
  index: number
  student: GroupedStudent
}

export function StudentCard({
  index,
  student
}: StudentCardProps): ReactElement {
  const backgroundColor =
    student.specialNeeds === true
      ? 'secondary.main'
      : student.totalScore > 7
        ? 'success.main'
        : student.totalScore > 4
          ? 'warning.main'
          : 'error.main'

  return (
    <>
      {student.name != null ? (
        <Stack
          gap={6}
          flexDirection="row"
          alignItems="center"
          sx={{
            py: 2,
            px: 6,
            borderRadius: 2,
            borderColor: 'text.secondary'
          }}
        >
          <Avatar
            alt={student.name}
            sx={{
              backgroundColor,
              color: 'text.primary',
              width: 36,
              height: 36,
              fontSize: '0.75rem'
            }}
          >
            {index + 1}
          </Avatar>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Typography variant="h3">{student.name}</Typography>
            <Typography variant="body2">Score: {student.totalScore}</Typography>
          </Stack>
        </Stack>
      ) : (
        <></>
      )}
    </>
  )
}
