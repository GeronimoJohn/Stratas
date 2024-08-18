import { render, screen } from '@testing-library/react'
import { Coffee } from './Coffee'

describe('Coffee', () => {
  it('should render the coffee component', () => {
    render(<Coffee />)
    expect(screen.getByText('Buy me a coffee')).toBeInTheDocument()
    expect(screen.getByTestId('CoffeeRoundedIcon')).toBeInTheDocument()
  })
})
