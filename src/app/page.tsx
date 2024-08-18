import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Page() {
  return (
    <Box
      sx={{
        mt: '100px',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Typography variant="h1">Stratas</Typography>
      <Typography variant="h4">
        Inspired by strata, representing different levels or layers
      </Typography>
    </Box>
  )
}
