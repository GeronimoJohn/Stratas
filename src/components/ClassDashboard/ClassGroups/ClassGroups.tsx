import { ReactElement, useRef } from 'react'
import Papa from 'papaparse'
import { saveAs } from 'file-saver'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import {
  classSorter,
  sortByScore,
  splitByHighNeeds,
  StudentInformation
} from '@/libs/classSorter'

import { StudentCard } from './StudentCard'
import { StudentPair, GroupedStudent } from '@/libs/classSorter'

interface ClassGroupsProps {
  studentsInformation?: StudentInformation[]
  studentPairs?: StudentPair[]
  numberOfGroups: number
}

export function ClassGroups({
  studentsInformation = [],
  studentPairs,
  numberOfGroups
}: ClassGroupsProps): ReactElement {
  const printRef = useRef<HTMLDivElement>(null)

  const sortedStudents = sortByScore(studentsInformation)
  const { highNeeds, regular } = splitByHighNeeds(sortedStudents)
  const groups = classSorter(
    [...highNeeds, ...regular],
    numberOfGroups,
    studentPairs
  )

  const handleExportCSV = () => {
    const csvData: string[][] = []
    groups.forEach((group, index) => {
      csvData.push([`Class ${index + 1}`])
      csvData.push([
        'ID',
        'First Name',
        'Last Name',
        'Total Score',
        'High Needs',
        'Gender',
        'ESOL'
      ])
      group.forEach((student: GroupedStudent) => {
        csvData.push([
          student.id,
          student.firstName,
          student.lastName,
          student.totalScore.toString(),
          student.highNeeds ? 'Yes' : 'No',
          student.gender,
          student.esol ? 'Yes' : 'No'
        ])
      })
      csvData.push([])
    })

    const csv = Papa.unparse(csvData)

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'class_groups.csv')
  }

  return (
    <>
      <Button
        variant="contained"
        sx={{ mb: 2, ml: 2 }}
        onClick={handleExportCSV}
        className="no-print"
      >
        Export CSV
      </Button>
      <Stack
        ref={printRef}
        data-testid="class-groups"
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
                {group.map((student, index) => (
                  <StudentCard
                    key={student.id}
                    index={index}
                    student={student}
                  />
                ))}
              </Stack>
            </Stack>
          ))}
      </Stack>
    </>
  )
}
