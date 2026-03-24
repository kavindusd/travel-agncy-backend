const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subline: {
        type: String,
        required: true
    },
    price: {
        type: String, 
        required: true
    },
    days: {
        type: String,
        required: true
    },
    highlights: {
        type: [String], 
        required: true
    }
});

module.exports = mongoose.model('Package', PackageSchema);