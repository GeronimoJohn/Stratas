import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default function Home() {
  return (
    <Container
      sx={{
        backgroundColor: 'primary.main'
      }}
    >
      <Typography variant="h1">Welcome to Next.js!</Typography>
    </Container>
  )
}
