import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import SchoolIcon from '@mui/icons-material/School'

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <SchoolIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema Escolar
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={RouterLink} to="/students">
            Estudiantes
          </Button>
          <Button color="inherit" component={RouterLink} to="/courses">
            Cursos
          </Button>
          <Button color="inherit" component={RouterLink} to="/enrollments">
            Inscripciones
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar 