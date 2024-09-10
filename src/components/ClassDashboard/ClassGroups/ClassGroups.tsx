import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { ReactElement } from 'react'

import {
  classSorter,
  GroupedStudent,
  sortByScore,
  splitBySpecialNeeds,
  StudentInformation
} from '@/libs/classSorter'

import type { StudentPair } from '../StudentConflicts/StudentConflicts'

interface ClassGroupsProps {
  studentsInformation?: StudentInformation[]
  studentConflicts?: StudentPair[]
  numberOfGroups: number
}

export function ClassGroups({
  studentsInformation = [],
  studentConflicts,
  numberOfGroups
}: ClassGroupsProps): ReactElement {
  const sortedStudents = sortByScore(studentsInformation)
  const { specialNeeds, regular } = splitBySpecialNeeds(sortedStudents)
  const groups = classSorter(
    [...specialNeeds, ...regular],
    numberOfGroups,
    studentConflicts
  )

  return (
    <Stack
      flexDirection="row"
      gap={1 * numberOfGroups}
      sx={{ flexWrap: 'wrap' }}
    >
      {studentsInformation.length > 0 &&
        groups.map((group, index) => (
          <Stack
            key={index}
            sx={{
              width: 400,
              borderRadius: 2,
              backgroundColor: 'background.default',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Stack
              gap={2}
              flexDirection="row"
              alignItems="center"
              sx={{
                p: 4,
                backgroundColor: 'primary.main',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8
              }}
            >
              <Groups2RoundedIcon
                fontSize="large"
                sx={{ color: 'background.default' }}
              />
              <Typography variant="h3" color="background.default">
                Class {index + 1}
              </Typography>
            </Stack>
            <Stack
              direction="column"
              divider={
                <Divider
                  sx={{
                    borderColor: 'text.secondary',
                    opacity: 0.4,
                    '&:last-child': { display: 'none' }
                  }}
                />
              }
              sx={{ overflowX: 'auto' }}
            >
              {group.map((student) => (
                <StudentCard key={student.name} student={student} />
              ))}
            </Stack>
          </Stack>
        ))}
    </Stack>
  )
}

function StudentCard({ student }: { student: GroupedStudent }): ReactElement {
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
            {student.name.charAt(0)}
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
