import { useState, useEffect } from 'react'
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Button, Alert } from '@mui/material'
import axios from 'axios'

const Enrollments = () => {
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const API_URL = 'http://localhost:3000'

  useEffect(() => {
    fetchStudents()
    fetchCourses()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/student`)
      setStudents(response.data)
    } catch (error) {
      setError('Error al cargar los estudiantes')
    }
  }

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/course`)
      setCourses(response.data)
    } catch (error) {
      setError('Error al cargar los cursos')
    }
  }

  const handleEnroll = async () => {
    if (!selectedStudent || !selectedCourse) {
      setError('Por favor selecciona un estudiante y un curso')
      setTimeout(() => setError(''), 3000)
      return
    }

    try {
      await axios.post(`${API_URL}/enroll`, {
        studentId: selectedStudent,
        courseId: selectedCourse
      })
      setSuccess('Inscripción realizada exitosamente')
      setSelectedStudent('')
      setSelectedCourse('')
      fetchStudents()
      fetchCourses()
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError('Error al realizar la inscripción')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Inscripciones
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Nueva Inscripción
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl fullWidth>
            <InputLabel>Estudiante</InputLabel>
            <Select
              value={selectedStudent}
              label="Estudiante"
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              {students.map((student) => (
                <MenuItem key={student._id} value={student._id}>
                  {student.name} ({student.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Curso</InputLabel>
            <Select
              value={selectedCourse}
              label="Curso"
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleEnroll}
            sx={{ minWidth: 120, alignSelf: 'flex-end' }}
          >
            Inscribir
          </Button>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Resumen de Inscripciones
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Paper sx={{ p: 3, flex: 1, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Estudiantes por Curso
          </Typography>
          {courses.map((course) => (
            <Box key={course._id} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">
                {course.title}:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.students?.length > 0
                  ? course.students.map(student => student.name).join(', ')
                  : 'Sin estudiantes inscritos'}
              </Typography>
            </Box>
          ))}
        </Paper>

        <Paper sx={{ p: 3, flex: 1, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Cursos por Estudiante
          </Typography>
          {students.map((student) => (
            <Box key={student._id} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">
                {student.name}:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {student.courses?.length > 0
                  ? student.courses.map(course => course.title).join(', ')
                  : 'Sin cursos inscritos'}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  )
}

export default Enrollments 