const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

module.exports = mongoose.model('Student', studentSchema)