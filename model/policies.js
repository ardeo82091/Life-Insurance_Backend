const mongoose = require('mongoose');

const PolicySchema = mongoose.Schema({
    dateCreated          :  {type:Date},
    accountno            :  {type:String},
    insuranceType        :  {type:String},
    insuranceScheme      :  {type:String},
    maturityDate         :  {type: Date},
    termPlan             :  {type:Number},
    premiumType          :  {type:Number},
    profitRatio          :  {type:Number},
    totalAmount          :  {type:Number},
    sumAssuredAfterYears :  {type:Number},
    installMentAmount    :  {type:Number},
    interestAmount       :  {type:Number},
    installmentLeft      :  {
                               type: [mongoose.SchemaTypes.ObjectId],
                               ref: "InstallMentLeft",
                            },
    claim                :  {type:Boolean},
},{
    timestamps   :   true
})

let policyModel = new mongoose.model('Policy', PolicySchema)
module.exports = policyModel;