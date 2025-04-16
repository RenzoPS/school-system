import { useState, useEffect } from 'react'
import { Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert } from '@mui/material'
import axios from 'axios'

const Students = () => {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const API_URL = 'http://localhost:3000'

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/student`)
      setStudents(response.data)
    } catch (error) {
      setError('Error al cargar los estudiantes')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/student`, formData)
      setSuccess('Estudiante creado exitosamente')
      setFormData({ name: '', email: '' })
      fetchStudents()
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError('Error al crear el estudiante')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Estudiantes
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Nuevo Estudiante
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" sx={{ minWidth: 120 }}>
            Crear
          </Button>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Lista de Estudiantes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Cursos Inscritos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  {student.courses?.length > 0
                    ? student.courses.map(course => course.title).join(', ')
                    : 'Sin cursos'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Students 