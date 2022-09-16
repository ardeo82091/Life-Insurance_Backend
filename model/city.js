const mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
    cityName : {type:String},
    isActive : {type:Boolean}
},{
    timestamps:true
})

const cityModel = new mongoose.model('City', CitySchema);
module.exports = cityModel;