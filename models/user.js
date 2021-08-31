const mongoose = require('mongoose');
const passpostLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passpostLocalMongoose);

module.exports = mongoose.model('User', UserSchema);