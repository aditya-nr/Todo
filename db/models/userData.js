const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    uid: {
        type: String, required: true, unique: true
    },
    data: String
})

const UserData = new mongoose.model("UserData", dataSchema);

module.exports = UserData;