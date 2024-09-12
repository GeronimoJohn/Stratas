import { ReactElement, useRef } from 'react'

import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import PrintIcon from '@mui/icons-material/Print'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import {
  classSorter,
  sortByScore,
  splitBySpecialNeeds,
  StudentInformation
} from '@/libs/classSorter'

import { StudentCard } from './StudentCard'
import { useReactToPrint } from 'react-to-print'
import { StudentPair } from '@/libs/classSorter'

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
  const { specialNeeds, regular } = splitBySpecialNeeds(sortedStudents)
  const groups = classSorter(
    [...specialNeeds, ...regular],
    numberOfGroups,
    studentPairs
  )

  const handleClick = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: auto;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .MuiStack-root[data-testid="class-groups"] {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          gap: ${1 * numberOfGroups * 8}px !important;
        }
        .MuiStack-root[data-testid="class-groups"] > * {
          page-break-inside: avoid;
          margin-bottom: 20px;
        }
      }
    `,
    removeAfterPrint: true
  })

  return (
    <>
      <Button
        variant="contained"
        startIcon={<PrintIcon />}
        onClick={handleClick}
        sx={{ mb: 2 }}
        className="no-print"
      >
        Print
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
                    key={student.name}
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
