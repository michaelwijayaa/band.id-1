const mongoose = require('mongoose')

const applySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    isActive: Boolean,
    isAccepted: Boolean,
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }
})

module.exports = mongoose.model('Apply', applySchema)