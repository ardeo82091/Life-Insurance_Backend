const mongoose = require('mongoose');

const QuerySchema = mongoose.Schema({
    customerName   : {type:String},
    title          : {type:String},
    message        : {type:String},
    reply          : {type:String}
},{
    timestamps:true
})

const queryModel = new mongoose.model('Query', QuerySchema);
module.exports = queryModel;