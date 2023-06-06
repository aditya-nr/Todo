const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    hash: String,
    salt: String
});

const User = new mongoose.model('User', userSchema);

module.exports = User;