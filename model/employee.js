const mongoose = require('mongoose');
const validatorPackage = require('validator')

const EmployeeSchema = mongoose.Schema({
    firstName    :  {type:String ,required: true},
    lastName     :  {type:String ,required: true},
    credential   :  {type: mongoose.SchemaTypes.ObjectId,ref:"Credentials"},
    dateOfBirth  :  {type:Date},
    age          :  {type:Number, min: [21, 'Must be at least 21']},
    email        :  {type: String,
        unique   :  true,
        required :  [true, 'Email address is required'],
        validate :  {
        validator:  validatorPackage.isEmail,
        message  :  'Please provide a valid email',
        }},
    role         :  {type:String},
    isActive     :  {type:Boolean},
},{
    timestamps   :   true
})

let employeeModel = new mongoose.model('Employee', EmployeeSchema)
module.exports = employeeModel;