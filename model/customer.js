const mongoose = require('mongoose');
const validatorPackage = require('validator')

const CustomerSchema = mongoose.Schema({
    firstName       :  {type:String ,required: true},
    lastName        :  {type:String ,required: true},
    credential      :  {type: mongoose.SchemaTypes.ObjectId,ref:"Credentials"},
    dateOfBirth     :  {type:Date},
    age             :  {type:Number, min: [21, 'Must be at least 21']},
    address         :  {type:String},
    email           :  {type: String, 
                            unique     : true, 
                            required   : [true, 'Email address is required'],
                            validate   : 
                            { 
                                validator :  validatorPackage.isEmail,
                                message   : 'Please provide a valid email',
                            }
                        },
    state           :  {type:String}, 
    city            :  {type:String}, 
    pincode         :  {type:Number}, 
    nominee         :  {type:String}, 
    nomineeRelation :  {type:String}, 
    policies        :  {type:[mongoose.SchemaTypes.ObjectId],ref:"Policy"},
    claimPolicy     :  {type:[mongoose.SchemaTypes.ObjectId],ref:"PolicyClaim"},
    agentrefer      :  {type:String},
    role            :  {type:String},
    isActive        :  {type:Boolean}
},{
    timestamps:true
})

let customerModel = new mongoose.model('Customer', CustomerSchema)
module.exports = customerModel;