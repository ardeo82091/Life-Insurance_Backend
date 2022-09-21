const mongoose = require('mongoose');

const InstallLeftSchema = mongoose.Schema({
    installmentNo          :  {type:Number},
    installmentDate        :  {type:Date},
    installAmount          :  {type:Number},
    payDate                :  {type:String},
    paymentStatus          :  {type:String},
    policyPayment          :  {type:String},
},{
    timestamps   :   true
})

let installLeftModel = new mongoose.model('InstallMentLeft', InstallLeftSchema)
module.exports = installLeftModel;