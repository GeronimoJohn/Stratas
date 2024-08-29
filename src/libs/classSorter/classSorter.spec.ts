import {
  StudentInformation,
  sortByScore,
  splitBySpecialNeeds,
  classSorter
} from './classSorter'

describe('classSorter', () => {
  const sampleStudents: StudentInformation[] = [
    {
      id: '1',
      name: 'Alice',
      reading: 80,
      writing: 85,
      math: 90,
      specialNeeds: false
    },
    {
      id: '2',
      name: 'Bob',
      reading: 70,
      writing: 75,
      math: 80,
      specialNeeds: true
    },
    {
      id: '3',
      name: 'Charlie',
      reading: 90,
      writing: 95,
      math: 100,
      specialNeeds: false
    },
    {
      id: '4',
      name: 'David',
      reading: 60,
      writing: 65,
      math: 70,
      specialNeeds: true
    }
  ]

  describe('sortByScore', () => {
    it('should sort students by total score in ascending order', () => {
      const sorted = sortByScore(sampleStudents)
      expect(sorted[0].name).toBe('David')
      expect(sorted[3].name).toBe('Charlie')
    })
  })

  describe('splitBySpecialNeeds', () => {
    it('should split students into special needs and regular groups', () => {
      const { specialNeeds, regular } = splitBySpecialNeeds(sampleStudents)
      expect(specialNeeds.length).toBe(2)
      expect(regular.length).toBe(2)
      expect(specialNeeds.every((student) => student.specialNeeds)).toBe(true)
      expect(regular.every((student) => !student.specialNeeds)).toBe(true)
    })
  })

  describe('classSorter', () => {
    it('should create the correct number of groups', () => {
      const groups = classSorter(sampleStudents, 2)
      expect(groups.length).toBe(2)
    })

    it('should distribute students evenly', () => {
      const groups = classSorter(sampleStudents, 2)
      expect(groups[0].length).toBe(2)
      expect(groups[1].length).toBe(2)
    })

    it('should respect conflicts', () => {
      const conflicts: [string, string][] = [['Alice', 'Bob']]
      const groups = classSorter(sampleStudents, 2, conflicts)
      const group1Names = groups[0].map((student) => student.name)
      const group2Names = groups[1].map((student) => student.name)
      expect(
        (group1Names.includes('Alice') && group2Names.includes('Bob')) ||
          (group1Names.includes('Bob') && group2Names.includes('Alice'))
      ).toBe(true)
    })
  })
})
