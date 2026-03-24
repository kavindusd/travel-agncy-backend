const mongoose = require('mongoose');

const airTickets = new mongoose.Schema({
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
    departureCity:{
        type: String,
        required: true
    },
    arrivalCity:{
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
    class:{
        type: String,
        required: true
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

});

module.exports = mongoose.model('airTickets', airTickets);