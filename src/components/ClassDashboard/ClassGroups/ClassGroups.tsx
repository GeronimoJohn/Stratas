import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import { ReactElement } from 'react'

import {
  classSorter,
  GroupedStudent,
  sortByScore,
  splitBySpecialNeeds,
  StudentInformation
} from '@/libs/classSorter'

interface ClassGroupsProps {
  studentsInformation?: StudentInformation[]
}

export function ClassGroups({
  studentsInformation = []
}: ClassGroupsProps): ReactElement {
  const numberOfGroups = 3

  const sortedStudents = sortByScore(studentsInformation)
  const { specialNeeds, regular } = splitBySpecialNeeds(sortedStudents)
  const groups = classSorter([...specialNeeds, ...regular], numberOfGroups)

  return (
    <Stack
      flexDirection="row"
      gap={5 * numberOfGroups}
      sx={{ flexWrap: 'wrap' }}
    >
      {studentsInformation.length > 0 &&
        groups.map((group, index) => (
          <Stack
            gap={3}
            key={index}
            sx={{
              p: 4,
              width: 800,
              borderRadius: 2,
              backgroundColor: 'background.default',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Stack
              gap={2}
              flexDirection="row"
              alignItems="center"
              sx={{ p: 4, backgroundColor: 'primary.main', borderRadius: 2 }}
            >
              <Groups2RoundedIcon
                fontSize="large"
                sx={{ color: 'background.default' }}
              />
              <Typography variant="h3" color="background.default">
                Class {index + 1}
              </Typography>
            </Stack>
            <Grid container spacing={2}>
              {group.map((student) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={student.name}>
                  <StudentCard student={student} />
                </Grid>
              ))}
            </Grid>
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
            p: 2,
            borderRadius: 2,
            borderColor: 'text.secondary'
          }}
        >
          <Avatar
            alt={student.name}
            sx={{ backgroundColor, color: 'text.primary' }}
          >
            {student.name.charAt(0)}
          </Avatar>
          <Stack>
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
