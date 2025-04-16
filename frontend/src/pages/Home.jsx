import { Box, Typography, Grid, Paper, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PeopleIcon from '@mui/icons-material/People'
import SchoolIcon from '@mui/icons-material/School'
import AssignmentIcon from '@mui/icons-material/Assignment'

const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      title: 'Gestión de Estudiantes',
      description: 'Administra la información de los estudiantes',
      icon: <PeopleIcon sx={{ fontSize: 60 }} />,
      path: '/students'
    },
    {
      title: 'Gestión de Cursos',
      description: 'Administra los cursos disponibles',
      icon: <SchoolIcon sx={{ fontSize: 60 }} />,
      path: '/courses'
    },
    {
      title: 'Inscripciones',
      description: 'Gestiona las inscripciones de estudiantes a cursos',
      icon: <AssignmentIcon sx={{ fontSize: 60 }} />,
      path: '/enrollments'
    }
  ]

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Bienvenido al Sistema Escolar
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
        Gestiona estudiantes, cursos e inscripciones de manera eficiente
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
              <Typography variant="h5" component="h3" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 2, flexGrow: 1 }}>
                {feature.description}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate(feature.path)}
                sx={{ mt: 2 }}
              >
                Acceder
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Home 