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
  conflicts: [string, string][]
): boolean {
  return !group.some((existingStudent) =>
    conflicts.some(
      ([name1, name2]) =>
        (name1 === existingStudent.name && name2 === student.name) ||
        (name1 === student.name && name2 === existingStudent.name)
    )
  )
}

export function classSorter(
  students: StudentInformation[],
  numberOfGroups: number,
  conflicts: [string, string][] = []
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

    while (
      !canJoinGroup(groups[currentGroupIndex], studentWithScore, conflicts)
    ) {
      currentGroupIndex = (currentGroupIndex + 1) % numberOfGroups
    }

    groups[currentGroupIndex].push(studentWithScore)
    currentGroupIndex = (currentGroupIndex + 1) % numberOfGroups
  }

  return groups
}
