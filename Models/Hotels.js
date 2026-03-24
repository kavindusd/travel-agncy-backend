const mongoose = require('mongoose');

const Hotels = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    PhoneNumber:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:false,
        lowercase: true,
        trim: true
    },
    destination:{
        type: String,
        required: true
    },
        members:{
        type: Number,
        required: true,
        min:1
    },
    checkIn:{
        type: Date,
        required: true
    }, 
    checkOut:{
        type: Date,
        required: false
    }, 
    bookingDate:{
        type: Date,
        default: Date.now
    },
        status:{
        type: String,
        default: 'pending',
        enum:['pending','confirmed','cancelled']
    }
});

module.exports = mongoose.model('Hotels', Hotels);