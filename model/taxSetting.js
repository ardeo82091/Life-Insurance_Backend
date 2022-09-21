const mongoose = require('mongoose');

const TaxSettingSchema = mongoose.Schema({
    taxpercentage          : {type:Number}
},{
    timestamps:true
})

const taxSettingModel = new mongoose.model('TaxSetting', TaxSettingSchema);
module.exports = taxSettingModel;