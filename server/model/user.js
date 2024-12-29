const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        trim: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    phoneNumber: {
        type: String,
        minlength: 10,
        maxlength: 10,
    },
    role: {
        type: String,
        enum: ['Admin', 'Employee','Guest'],
        default: 'Employee',
    },
    profilePicture: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended'],
        default: 'Active',
    },
    lastLogin: {
        type: Date,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
