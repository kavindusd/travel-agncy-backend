const mongoose = require('mongoose');

const Visa = new mongoose.Schema({
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
    departureDate:{
        type: Date,
        required: true
    }, 
    arrivalDate:{
        type: Date,
        required: false
    }, 
    passengerCount:{
        type: Number,
        required: true,
        min:1
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
})

module.exports = mongoose.model('Visa', Visa);