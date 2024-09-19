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
    highNeeds: students.filter((student) => student.highNeeds),
    regular: students.filter((student) => !student.highNeeds)
  }
}

function hasConflict(
  group: GroupedStudent[],
  student: GroupedStudent,
  studentPairs: StudentPair[]
): boolean {
  return group.some((existingStudent) =>
    studentPairs.some(
      ({ type, pair }) =>
        type === 'conflict' &&
        pair.includes(existingStudent.name) &&
        pair.includes(student.name)
    )
  )
}

function hasPairing(
  group: GroupedStudent[],
  student: GroupedStudent,
  studentPairs: StudentPair[]
): boolean {
  return studentPairs.some(({ type, pair }) => {
    if (type !== 'pair') return false
    if (!pair.includes(student.name)) return false
    const otherStudent = pair.find((name) => name !== student.name)
    if (!otherStudent) return false
    return (
      group.some((s) => s.name === otherStudent) ||
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
    minBy(groups, (group) => {
      const conflictCount = studentPairs.filter(
        ({ type, pair }) =>
          type === 'conflict' &&
          pair.includes(student.name) &&
          group.some((groupStudent) => pair.includes(groupStudent.name))
      ).length
      return conflictCount * 1000 + group.length
    }) || groups[0]
  )
}

function balanceGroups(
  groups: GroupedStudent[][],
  studentPairs: StudentPair[]
): GroupedStudent[][] {
  const maxIterations = groups.reduce((sum, group) => sum + group.length, 0) * 2

  let balancedGroups = [...groups] // Ensure we're not mutating the original array

  for (let i = 0; i < maxIterations; i++) {
    const maxGroup = maxBy(balancedGroups, 'length') as GroupedStudent[]
    const minGroup = minBy(balancedGroups, 'length') as GroupedStudent[]

    if (maxGroup.length <= minGroup.length) break

    const studentToMove = maxGroup.find((student) =>
      canJoinGroup(minGroup, student, studentPairs)
    )

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
  }

  return balancedGroups
}

export function classSorter(
  students: StudentInformation[],
  numberOfGroups: number,
  studentPairs: StudentPair[] = []
): GroupedStudent[][] {
  const sortedStudents = sortByScore(students).map(createGroupedStudent)

  const initialGroups: GroupedStudent[][] = range(numberOfGroups).map(() => [])

  const groupedStudents = new Set<string>()

  function addToGroup(student: GroupedStudent, group: GroupedStudent[]) {
    group.push(student)
    groupedStudents.add(student.name)
  }

  studentPairs.forEach(({ pair, type }) => {
    if (type === 'pair') {
      const [student1, student2] = pair
      const student1Obj = sortedStudents.find((s) => s.name === student1)
      const student2Obj = sortedStudents.find((s) => s.name === student2)

      if (
        student1Obj &&
        student2Obj &&
        !groupedStudents.has(student1) &&
        !groupedStudents.has(student2)
      ) {
        const availableGroup =
          initialGroups.find((g) => g.length === 0) || initialGroups[0]
        addToGroup(student1Obj, availableGroup)
        addToGroup(student2Obj, availableGroup)
      }
    }
  })

  sortedStudents.forEach((student) => {
    if (!groupedStudents.has(student.name)) {
      const bestGroup = findBestGroup(initialGroups, student, studentPairs)
      bestGroup.push(student)
    }
  })

  return balanceGroups(initialGroups, studentPairs)
}
