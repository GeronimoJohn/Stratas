export interface StudentInformation {
  id: string
  name: string
  reading: number
  writing: number
  math: number
  specialNeeds: boolean
}

export interface GroupedStudent {
  name: string
  totalScore: number
  specialNeeds: boolean
}

export type Pair = [string, string]
export type PairType = 'conflict' | 'pair'
export type StudentPair = { pair: Pair; type: PairType }

function getStudentScore(student: StudentInformation): number {
  return student.reading + student.writing + student.math
}

export function sortByScore(
  students: StudentInformation[]
): StudentInformation[] {
  return students.sort((a, b) => getStudentScore(b) - getStudentScore(a)) // Sort in descending order
}

export function splitBySpecialNeeds(students: StudentInformation[]): {
  specialNeeds: StudentInformation[]
  regular: StudentInformation[]
} {
  return {
    specialNeeds: students.filter((student) => student.specialNeeds),
    regular: students.filter((student) => !student.specialNeeds)
  }
}

function canJoinGroup(
  group: GroupedStudent[],
  student: GroupedStudent,
  studentPairs: StudentPair[]
): boolean {
  const hasConflict = group.some((existingStudent) =>
    studentPairs.some(
      ({ type, pair }) =>
        type === 'conflict' &&
        ((pair[0] === existingStudent.name && pair[1] === student.name) ||
          (pair[0] === student.name && pair[1] === existingStudent.name))
    )
  )

  const hasPairing = studentPairs.some(
    ({ type, pair }) =>
      type === 'pair' &&
      ((pair[0] === student.name && group.some((s) => s.name === pair[1])) ||
        (pair[1] === student.name && group.some((s) => s.name === pair[0])))
  )

  return !hasConflict && (hasPairing || studentPairs.length === 0)
}

export function classSorter(
  students: StudentInformation[],
  numberOfGroups: number,
  studentPairs: StudentPair[] = []
): GroupedStudent[][] {
  const sortedStudents = sortByScore(students)
  const groups: GroupedStudent[][] = Array.from(
    { length: numberOfGroups },
    () => []
  )

  for (const student of sortedStudents) {
    const studentWithScore: GroupedStudent = {
      name: student.name,
      totalScore: getStudentScore(student),
      specialNeeds: student.specialNeeds
    }

    let bestGroup = groups[0]
    let leastConflicts = Infinity

    for (const group of groups) {
      const conflicts = studentPairs.filter(
        ({ type, pair }) =>
          type === 'conflict' &&
          group.some(
            (groupStudent) =>
              (pair[0] === groupStudent.name && pair[1] === student.name) ||
              (pair[0] === student.name && pair[1] === groupStudent.name)
          )
      ).length

      if (
        conflicts < leastConflicts ||
        (conflicts === leastConflicts && group.length < bestGroup.length)
      ) {
        leastConflicts = conflicts
        bestGroup = group
      }
    }

    bestGroup.push(studentWithScore)
  }

  // Balance the groups
  let iterations = 0
  const maxIterations = students.length * 2 // Prevent infinite loop

  while (iterations < maxIterations) {
    const maxGroup = groups.reduce((a, b) => (a.length > b.length ? a : b))
    const minGroup = groups.reduce((a, b) => (a.length < b.length ? a : b))

    if (maxGroup.length <= minGroup.length + 1) break // Groups are balanced

    for (const student of maxGroup) {
      if (canJoinGroup(minGroup, student, studentPairs)) {
        maxGroup.splice(maxGroup.indexOf(student), 1)
        minGroup.push(student)
        break
      }
    }

    iterations++
  }

  return groups
}
