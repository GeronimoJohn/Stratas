import orderBy from 'lodash/orderBy'
import groupBy from 'lodash/groupBy'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'
import range from 'lodash/range'
import isEmpty from 'lodash/isEmpty'

export interface StudentInformation {
  id: string
  name: string
  reading: number
  writing: number
  math: number
  highNeeds: boolean
}

export interface GroupedStudent {
  name: string
  totalScore: number
  highNeeds: boolean
}

export type Pair = [string, string]
export type PairType = 'conflict' | 'pair'
export interface StudentPair {
  pair: Pair
  type: PairType
}

function getStudentScore(student: StudentInformation): number {
  return student.reading + student.writing + student.math
}

function createGroupedStudent(student: StudentInformation): GroupedStudent {
  return {
    name: student.name,
    totalScore: getStudentScore(student),
    highNeeds: student.highNeeds
  }
}

export function sortByScore(
  students: StudentInformation[]
): StudentInformation[] {
  return orderBy(students, [getStudentScore], ['asc'])
}

export function splitByHighNeeds(students: StudentInformation[]): {
  highNeeds: StudentInformation[]
  regular: StudentInformation[]
} {
  return {
    highNeeds: students.filter(function (student) {
      return student.highNeeds
    }),
    regular: students.filter(function (student) {
      return !student.highNeeds
    })
  }
}

function hasConflict(
  group: GroupedStudent[],
  student: GroupedStudent,
  studentPairs: StudentPair[]
): boolean {
  return group.some(function (existingStudent) {
    return studentPairs.some(function ({ type, pair }) {
      return (
        type === 'conflict' &&
        pair.includes(existingStudent.name) &&
        pair.includes(student.name)
      )
    })
  })
}

function hasPairing(
  group: GroupedStudent[],
  student: GroupedStudent,
  studentPairs: StudentPair[]
): boolean {
  console.log('hasPairing', studentPairs)
  return studentPairs.some(({ type, pair }) => {
    if (type !== 'pair') return false
    if (!pair.includes(student.name)) return false
    const otherStudent = pair.find((name) => name !== student.name)
    if (!otherStudent) return false
    return (
      group.some((s) => s.name === otherStudent) ??
      studentPairs.some(
        ({ pair }) =>
          pair.includes(student.name) && !pair.includes(otherStudent)
      )
    )
  })
}

function canJoinGroup(
  group: GroupedStudent[],
  student: GroupedStudent,
  studentPairs: StudentPair[]
): boolean {
  console.log('canJoinGroup', hasPairing(group, student, studentPairs))
  return (
    !hasConflict(group, student, studentPairs) &&
    (hasPairing(group, student, studentPairs) || isEmpty(studentPairs))
  )
}

function findBestGroup(
  groups: GroupedStudent[][],
  student: GroupedStudent,
  studentPairs: StudentPair[]
): GroupedStudent[] {
  return (
    minBy(groups, function (group) {
      const conflictCount = studentPairs.filter(function ({ type, pair }) {
        return (
          type === 'conflict' &&
          pair.includes(student.name) &&
          group.some(function (groupStudent) {
            return pair.includes(groupStudent.name)
          })
        )
      }).length
      return conflictCount * 1000 + group.length
    }) || groups[0]
  )
}

function balanceGroups(
  groups: GroupedStudent[][],
  studentPairs: StudentPair[]
): GroupedStudent[][] {
  const maxIterations =
    groups.reduce(function (sum, group) {
      return sum + group.length
    }, 0) * 2

  return range(maxIterations).reduce(function (acc) {
    const maxGroup = maxBy(acc, 'length') as GroupedStudent[]
    const minGroup = minBy(acc, 'length') as GroupedStudent[]

    if (maxGroup.length <= minGroup.length) return acc

    const studentToMove = maxGroup.find(function (student) {
      return canJoinGroup(minGroup, student, studentPairs)
    })

    if (studentToMove) {
      maxGroup.splice(maxGroup.indexOf(studentToMove), 1)

      const insertIndex = minGroup.findIndex(
        (s) => s.totalScore > studentToMove.totalScore
      )

      if (insertIndex === -1) {
        minGroup.push(studentToMove)
      } else {
        minGroup.splice(insertIndex, 0, studentToMove)
      }
    }

    return acc
  }, groups)
}

export function classSorter(
  students: StudentInformation[],
  numberOfGroups: number,
  studentPairs: StudentPair[] = []
): GroupedStudent[][] {
  const sortedStudents = sortByScore(students).map(createGroupedStudent)
  const initialGroups: GroupedStudent[][] = range(numberOfGroups).map(
    function () {
      return []
    }
  )

  const groupedStudents = sortedStudents.reduce(function (groups, student) {
    const bestGroup = findBestGroup(groups, student, studentPairs)
    bestGroup.push(student)
    return groups
  }, initialGroups)

  return balanceGroups(groupedStudents, studentPairs)
}
