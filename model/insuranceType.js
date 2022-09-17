const mongoose = require('mongoose');

const InsuranceTypeSchema = mongoose.Schema({
    insuranceType     : {type: String},
    image             : {type: String},
    insuranceScheme   : {type: [mongoose.SchemaTypes.ObjectId],ref:"InsuranceScheme"},
    isActive          : {type: Boolean}
},{
    timestamps : true
})

const insuranceTypeModel = new mongoose.model('InsuranceType',InsuranceTypeSchema);
module.exports = insuranceTypeModel;