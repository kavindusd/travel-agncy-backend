const mongoose = require('mongoose');

const Contact = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        lowercase: true,
        trim: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'read', 'archived'], 
        default: 'pending'
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', Contact);