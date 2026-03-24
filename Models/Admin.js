const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['superadmin', 'visa_agent', 'flight_agent', 'hotel_agent','package_agent','china_service','inquiries'] 
    },
    phoneNumber: {
        type: String, 
        required: true // The WhatsApp number for this admin/agent
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Admin', AdminSchema);