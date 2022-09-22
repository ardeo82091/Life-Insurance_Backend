const mongoose = require('mongoose');

const CommisionClaimSchema = mongoose.Schema({
    reqDate                 :  {type:Date},
    agentName               :  {type:String},
    particulars             :  {type:String},
    withdrawDate            :  {type: Date},
    bankDetail             :  {type:String},
    withdrawAmount          :  {type:Number},  
    withdrawCheck           :  {type:Boolean},

},{
    timestamps   :   true
})

let commisionWithdrawModel = new mongoose.model('CommisionWithdraw', CommisionClaimSchema)
module.exports = commisionWithdrawModel;