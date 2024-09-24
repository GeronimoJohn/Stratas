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
    student.highNeeds === true
      ? 'secondary.main'
      : student.totalScore > 7
        ? 'success.main'
        : student.totalScore > 4
          ? 'warning.main'
          : 'error.main'

  return (
    <>
      {student.id != null ? (
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
            alt={student.id}
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
            direction="column"
            alignItems="start"
          >
            <Typography variant="h3">{student.firstName} {student.lastName}</Typography>
            <Stack direction="row" gap={4} justifyContent="space-between" sx={{width: '100%'}}>
              <Typography variant="body2">Score: {student.totalScore}</Typography>
              <Typography variant='body2'>Gender: {student.gender}</Typography>
              {student.esol && (
                <Typography variant='body2'>
                  Esol: Yes
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <></>
      )}
    </>
  )
}
