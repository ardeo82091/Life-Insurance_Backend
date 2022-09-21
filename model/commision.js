const mongoose = require('mongoose');

const CommisionSchema = mongoose.Schema({
    insuranceAccountNo         :  {type:String},
    agentName                  :  {type:String},
    customerName               :  {type:String},
    insuranceSchema            :  {type:String},
    commisionAmount            :  {type:Number},
},{
    timestamps   :   true
})

let commisionModel = new mongoose.model('Commision', CommisionSchema)
module.exports = commisionModel;

