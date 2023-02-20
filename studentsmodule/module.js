const mongoose = require('mongoose')

const studentData = mongoose.model('User', {
        id: Number,
        name: String,
        programme: String,
        level: Number,
        hall: String
    });

module.exports = studentData;