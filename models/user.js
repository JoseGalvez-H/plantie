const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

const userSchema = new Schema({
    name: String,
    googleId: {
        type: String,
        required: true
    },
    email: String,
    avatar: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);