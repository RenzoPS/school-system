const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/school')
        console.log('MongoDB Connected')
    } catch (error) {
        console.log('MongoDB Connection Failed:', error)
    }
}

module.exports = connectDB