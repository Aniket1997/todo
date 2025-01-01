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
    role:{
        type:String,
        enum:['Admin','Super-Admin','User'],
        default:'User'
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        minlength:10,
        maxlength:10,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
