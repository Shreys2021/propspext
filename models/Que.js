const mongoose = require('mongoose');

const queSchema = new mongoose.Schema({
    Que: {
        type: String,
        required: true
    }
})

const Questions = mongoose.model('Questions', queSchema);


module.exports = Questions;