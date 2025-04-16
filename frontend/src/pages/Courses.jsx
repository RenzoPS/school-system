import { useState, useEffect } from 'react'
import { Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert } from '@mui/material'
import axios from 'axios'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [formData, setFormData] = useState({ title: '', description: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const API_URL = 'http://localhost:3000'

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/course`)
      setCourses(response.data)
    } catch (error) {
      setError('Error al cargar los cursos')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/course`, formData)
      setSuccess('Curso creado exitosamente')
      setFormData({ title: '', description: '' })
      fetchCourses()
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError('Error al crear el curso')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Cursos
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Nuevo Curso
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={3}
          />
          <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-end' }}>
            Crear
          </Button>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Lista de Cursos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estudiantes Inscritos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>
                  {course.students?.length > 0
                    ? course.students.map(student => student.name).join(', ')
                    : 'Sin estudiantes'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Courses 