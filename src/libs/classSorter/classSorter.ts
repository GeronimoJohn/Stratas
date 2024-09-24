import orderBy from 'lodash/orderBy'
import groupBy from 'lodash/groupBy'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'
import range from 'lodash/range'
import isEmpty from 'lodash/isEmpty'

export interface StudentInformation {
  id: string
  firstName: string
  lastName: string
  reading: number
  writing: number
  math: number
  highNeeds: boolean
  gender: 'male' | 'female' | 'other'
  esol: boolean
}

export interface GroupedStudent {
  id: string
  firstName: string
  lastName: string
  totalScore: number
  highNeeds: boolean
  gender: 'male' | 'female' | 'other'
  esol: boolean
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
    id: student.id,
    firstName: student.firstName,
    lastName: student.lastName,
    totalScore: getStudentScore(student),
    highNeeds: student.highNeeds,
    gender: student.gender,
    esol: student.esol
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
        pair.includes(`${existingStudent.firstName} ${existingStudent.lastName}`) &&
        pair.includes(`${student.firstName} ${student.lastName}`)
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
    if (!pair.includes(`${student.firstName} ${student.lastName}`)) return false
    const otherStudent = pair.find((name) => name !== `${student.firstName} ${student.lastName}`)
    if (!otherStudent) return false
    return (
      group.some((s) => `${s.firstName} ${s.lastName}` === otherStudent) ||
      studentPairs.some(
        ({ pair }) =>
          pair.includes(`${student.firstName} ${student.lastName}`) && !pair.includes(otherStudent)
      )
    )
  })
}

function canJoinGroup(
  group: GroupedStudent[],
  student: GroupedStudent,
  studentPairs: StudentPair[]
): boolean {
  console.log(!hasConflict(group, student, studentPairs))
  return (
    !hasConflict(group, student, studentPairs) &&
    (hasPairing(group, student, studentPairs) || isEmpty(studentPairs))
  )
}

function calculateGenderImbalance(group: GroupedStudent[]): number {
  const genderCounts = groupBy(group, 'gender')
  const maleCount = (genderCounts['male'] || []).length
  const femaleCount = (genderCounts['female'] || []).length
  return Math.abs(maleCount - femaleCount)
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
          pair.includes(`${student.firstName} ${student.lastName}`) &&
          group.some((groupStudent) => pair.includes(`${groupStudent.firstName} ${groupStudent.lastName}`))
      ).length
      const genderImbalance = calculateGenderImbalance([...group, student])
      return conflictCount * 1000 + group.length * 100 + genderImbalance
    }) || groups[0]
  )
}

function balanceGroups(
  groups: GroupedStudent[][],
  studentPairs: StudentPair[]
): GroupedStudent[][] {
  const maxIterations = groups.reduce((sum, group) => sum + group.length, 0) * 2

  let balancedGroups = [...groups]

  for (let i = 0; i < maxIterations; i++) {
    const maxGroup = maxBy(balancedGroups, 'length') as GroupedStudent[]
    const minGroup = minBy(balancedGroups, 'length') as GroupedStudent[]

    if (maxGroup.length <= minGroup.length + 1) break

    const studentToMove = maxGroup.find((student) =>
      canJoinGroup(minGroup, student, studentPairs) &&
      calculateGenderImbalance([...minGroup, student]) <= calculateGenderImbalance(minGroup)
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
    groupedStudents.add(`${student.firstName} ${student.lastName}`)
  }

  studentPairs.forEach(({ pair, type }) => {
    if (type === 'pair') {
      const [student1, student2] = pair
      const student1Obj = sortedStudents.find((s) => `${s.firstName} ${s.lastName}` === student1)
      const student2Obj = sortedStudents.find((s) => `${s.firstName} ${s.lastName}` === student2)

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
    if (!groupedStudents.has(`${student.firstName} ${student.lastName}`)) {
      const bestGroup = findBestGroup(initialGroups, student, studentPairs)
      bestGroup.push(student)
    }
  })

  return balanceGroups(initialGroups, studentPairs)
}