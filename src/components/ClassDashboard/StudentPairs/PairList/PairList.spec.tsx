import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ConflictList } from './PairList'
import { StudentPair } from '../StudentPairs'

describe('ConflictList', () => {
  const mockConflicts: StudentPair[] = [
    ['Alice', 'Bob'],
    ['Charlie', 'David']
  ]

  it('renders a list of conflicts', () => {
    render(
      <ConflictList conflicts={mockConflicts} onRemoveConflict={() => {}} />
    )
    expect(screen.getByText('Alice - Bob')).toBeInTheDocument()
    expect(screen.getByText('Charlie - David')).toBeInTheDocument()
  })

  it('calls onRemoveConflict with correct index when delete button is clicked', () => {
    const mockOnRemoveConflict = jest.fn()

    render(
      <ConflictList
        conflicts={mockConflicts}
        onRemoveConflict={mockOnRemoveConflict}
      />
    )

    const deleteButtons = screen.getAllByLabelText('delete')
    fireEvent.click(deleteButtons[1])
    expect(mockOnRemoveConflict).toHaveBeenCalledWith(1)
  })

  it('renders an empty list when no conflicts are provided', () => {
    render(<ConflictList conflicts={[]} onRemoveConflict={() => {}} />)
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })
})
