const mongoose = require('mongoose');

// User Schema
const DatabaseUserSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    genre:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        // required: true
    },
    profileHeader:{
        type: String
    },
    pastGig:{
        gigName: String,
        date: String
    }
});

const User = module.exports = mongoose.model('DatabaseUser', DatabaseUserSchema);
