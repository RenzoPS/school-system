const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
const Course = require('./models/course')
const Student = require('./models/student')

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.post('/student', async (req, res) => {
    try{
        const{name, email} = req.body
        const newStudent = new Student({name, email})
        await newStudent.save()
        res.status(200).json(newStudent)
    } catch (e) {
        res.status(400).json({error: e.message })
    }
})

app.post('/course', async (req, res) => {
    try{
        const {title, description} = req.body
        const newCourse = new Course({title, description})
        await newCourse.save()
        res.status(200).json(newCourse)
    } catch (e) {
        res.status(400).json({error: e.message})
    }
})

app.post('/enroll', async (req, res) => {
    const {studentId, courseId} = req.body
    try{
        const student = await Student.findById(studentId)
        const course = await Course.findById(courseId)
        if(!student || !course){
            return res.status(404).json({message: 'Estudiante o curso no encontrado'})
        }
        if(!student.courses.includes(courseId) && !course.students.includes(studentId)){
            student.courses.push(courseId)
            course.students.push(studentId)
            await student.save()
            await course.save()
        }

        res.status(200).json({message: 'El estudiante fue registrado en el curso con exito'})

    } catch (e) {
        res.status(500).json({message: 'Error al inscribir el estudiante', error: e.message})
    }
})

app.get('/student', async (req, res) => {
    try{
        const students = await Student.find().populate('courses', 'title description')
        res.status(200).json(students)
    } catch (e) {
        res.status(500).json({message: 'Error al obtener los estudiantes', error: e.message})
    }
})

app.get('/course', async (req, res) => {
    try{
        const courses = await Course.find().populate('students', 'name email')
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los cursos', error})
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})