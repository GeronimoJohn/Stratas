import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Page() {
  return (
    <Box sx={{ backgroundColor: 'primary.light', height: '100%', padding: 2 }}>
      <Typography variant="h4">Welcome to My App</Typography>
      <Typography>
        This content will appear in the main area next to the sidebar.
      </Typography>
    </Box>
  )
}
