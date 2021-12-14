const mongoose = require('mongoose');

const checklistSchema = mongoose.Schema({
    name : {type: String, required: true},
    checklist: [{ //está em um array pois terá mais de uma task
        type: mongoose.Schema.Types.ObjectId,  //vai estar relacionado ao ObjectID 
        ref: 'Task',
    }]
})

module.exports = mongoose.model('Checklist', checklistSchema);