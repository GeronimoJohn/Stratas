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
  return students.sort((a, b) => getStudentScore(a) - getStudentScore(b))
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
  const groups = Array.from(
    { length: numberOfGroups },
    () => [] as GroupedStudent[]
  )
  let currentGroupIndex = 0

  for (const student of students) {
    const studentWithScore: GroupedStudent = {
      name: student.name,
      totalScore: getStudentScore(student),
      specialNeeds: student.specialNeeds
    }

    let placed = false
    for (let i = 0; i < numberOfGroups; i++) {
      if (
        canJoinGroup(groups[currentGroupIndex], studentWithScore, studentPairs)
      ) {
        groups[currentGroupIndex].push(studentWithScore)
        placed = true
        break
      }
      currentGroupIndex = (currentGroupIndex + 1) % numberOfGroups
    }

    if (!placed) {
      // If the student couldn't be placed due to conflicts/pairings, place them in the group with the least students
      const minGroup = groups.reduce(
        (min, group) => (group.length < min.length ? group : min),
        groups[0]
      )
      minGroup.push(studentWithScore)
    }

    currentGroupIndex = (currentGroupIndex + 1) % numberOfGroups
  }

  return groups
}
