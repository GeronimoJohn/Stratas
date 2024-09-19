import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StudentConflicts, StudentPair } from './StudentPairs'

describe('StudentConflicts', () => {
  it('renders the component with title', () => {
    render(
      <StudentConflicts studentConflicts={[]} setStudentConflicts={() => {}} />
    )
    expect(screen.getByText('Student Conflicts')).toBeInTheDocument()
  })

  it('removes a conflict when delete button is clicked', async () => {
    const initialConflicts: StudentPair[] = [
      ['Alice', 'Bob'],
      ['Charlie', 'David']
    ]
    const mockSetStudentConflicts = jest.fn()

    render(
      <StudentConflicts
        studentConflicts={initialConflicts}
        setStudentConflicts={mockSetStudentConflicts}
      />
    )
    const deleteButtons = screen.getAllByLabelText('delete')
    fireEvent.click(deleteButtons[0])
    await waitFor(() => expect(mockSetStudentConflicts).toHaveBeenCalled())
  })

  it('renders the list of conflicts', () => {
    const conflicts: StudentPair[] = [
      ['Alice', 'Bob'],
      ['Charlie', 'David']
    ]

    render(
      <StudentConflicts
        studentConflicts={conflicts}
        setStudentConflicts={() => {}}
      />
    )

    expect(screen.getByText('Alice - Bob')).toBeInTheDocument()
    expect(screen.getByText('Charlie - David')).toBeInTheDocument()
  })
})
