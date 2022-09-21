const mongoose = require('mongoose');

const InstallLeftSchema = mongoose.Schema({
    installmentNo          :  {type:Number},
    installmentDate        :  {type:Date},
    installAmount          :  {type:Number},
    payDate                :  {type:Date},
    paymentStatus          :  {type:String},
    policyPayment          :  {type: mongoose.SchemaTypes.ObjectId,ref:"PolicyPayment"},
},{
    timestamps   :   true
})

let installLeftModel = new mongoose.model('InstallMentLeft', InstallLeftSchema)
module.exports = installLeftModel;