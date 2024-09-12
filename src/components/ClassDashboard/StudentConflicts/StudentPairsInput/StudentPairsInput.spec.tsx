import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StudentPairsInput } from './StudentPairsInput'

describe('StudentPairsInput', () => {
  it('renders two input fields and a button', () => {
    render(<StudentPairsInput onAddConflict={jest.fn()} />)

    expect(
      screen.getByRole('textbox', { name: 'Student 1' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'Student 2' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Add Conflict' })
    ).toBeInTheDocument()
  })

  it('calls onAddConflict with correct values when form is submitted', async () => {
    const mockOnAddConflict = jest.fn()

    render(<StudentPairsInput onAddConflict={mockOnAddConflict} />)

    fireEvent.change(screen.getByRole('textbox', { name: 'Student 1' }), {
      target: { value: 'Alice' }
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Student 2' }), {
      target: { value: 'Bob' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add Conflict' }))
    expect(mockOnAddConflict).toHaveBeenCalledWith(['Alice', 'Bob'])
  })

  it('does not call onAddConflict when inputs are empty', () => {
    const mockOnAddConflict = jest.fn()

    render(<StudentPairsInput onAddConflict={mockOnAddConflict} />)

    fireEvent.click(screen.getByRole('button', { name: 'Add Conflict' }))
    expect(mockOnAddConflict).not.toHaveBeenCalled()
  })
})
