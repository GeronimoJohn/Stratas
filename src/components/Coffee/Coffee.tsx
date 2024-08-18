import Button from '@mui/material/Button'
import CoffeeRoundedIcon from '@mui/icons-material/CoffeeRounded'
import React from 'react'

export function Coffee() {
  function handleClick() {
    console.log('Implementing this feature soon!')
  }

  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        p: 2,
        m: 4,
        borderRadius: 2,
        backgroundColor: 'primary.dark'
      }}
      onClick={handleClick}
      endIcon={
        <CoffeeRoundedIcon
          sx={{
            ml: 1
          }}
        />
      }
    >
      Buy me a coffee
    </Button>
  )
}
