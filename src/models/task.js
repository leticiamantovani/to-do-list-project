const mongoose = require('mongoose');

const tasktSchema = mongoose.Schema({
    name : {type: String, required: true},
    done: {type: Boolean, default: false},
    checklist: {
        type: mongoose.Schema.ObjectId,  
        ref: 'Checklist',
        required: true
    }
})

module.exports = mongoose.model('Task', tasktSchema);