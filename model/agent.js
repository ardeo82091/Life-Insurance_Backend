const mongoose = require('mongoose');
const validatorPackage = require('validator')

const AgentSchema = mongoose.Schema({
    fullName     :  {type:String ,required: true},
    agentCode    :  {type:String},
    credential   :  {type:mongoose.SchemaTypes.ObjectId,ref:"Credentials"},
    address      :  {type:String},
    emailId      :  {type: String, 
                        unique     : true, 
                        required   : [true, 'Email address is required'],
                        validate   : 
                        { 
                            validator :  validatorPackage.isEmail,
                            message   : 'Please provide a valid email',
                        }
                    },
    qualification:  {type:String},
    role         :  {type:String},
    isActive     :  {type:Boolean},
},{
    timestamps   :   true
})

let agentModel = new mongoose.model('Agent', AgentSchema)
module.exports = agentModel;