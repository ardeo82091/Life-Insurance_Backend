const mongoose = require('mongoose');

const StateSchema = mongoose.Schema({
    stateName : {type:String},
    city      : {type:[mongoose.SchemaTypes.ObjectId],ref:"City"},
    isActive  : {type:Boolean}
},{
    timestamps : true
})

let stateModel = new mongoose.model("State",StateSchema);
module.exports = stateModel;
