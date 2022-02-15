const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    name: {
        type: String,
        default: ''
    },
    bio: { 
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: "https://storage.googleapis.com/social-app-files/profilepic-placeholder.png"
    },
    banner: {
        type: String,
        default: "https://storage.googleapis.com/social-app-files/banner-placerholder.png"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    two_factor_temp_secret: {
        type: Object,
    },
    two_factor_secret: {
        type: Object,
    },
    two_factor_enabled: {
        type: Boolean,
        default: false
    },
    lastSignedIn: {
        type: Date,
        default: () => new Date()
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
    }
})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel