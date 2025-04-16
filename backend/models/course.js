const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}]
})

module.exports = mongoose.model('Course', courseSchema)

