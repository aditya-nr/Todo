const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    uid: { type: String, required: true }
}, { timestamps: true });

const Session = new mongoose.model('Session', sessionSchema);

module.exports = Session;