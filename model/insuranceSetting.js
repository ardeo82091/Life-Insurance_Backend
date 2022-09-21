const mongoose = require('mongoose');

const InsuranceSettingSchema = mongoose.Schema({
    claimDeduction          : {type:Number},
    penaltyPay              : {type:Number}
},{
    timestamps:true
})

const insuranceSettingModel = new mongoose.model('InsuranceSetting', InsuranceSettingSchema);
module.exports =  insuranceSettingModel;