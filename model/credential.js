const mongoose = require('mongoose');
const CredSchema = mongoose.Schema({
    userName: { type: String },
    password: { type: String }
}, {
    timestamps: true
})

let credModel = new mongoose.model('Credentials', CredSchema)

module.exports=credModel;