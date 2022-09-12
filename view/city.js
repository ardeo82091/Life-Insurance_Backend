const {DatabaseMongoose} = require('../repository/database');

class City{
    constructor()
    {
        this.cityName  = cityName;
        this.isActive  = true; 
    }

    static async createNewCity(stateName,cityName)
    {
        const db = new DatabaseMongoose();
        let findState = await db.findOneState({"stateName":stateName});
        let findCity = await db.findOneCity({"CityName":cityName});
        if(!findCity)
        {
            let newCity = await db.insertOneCity(new City(cityName));
            let update  = await db.updateOneState({stateName:findState._id},{$push:{"city":newCity}})
            return [true,"City Created SuccessFully"];
        }
        return [false,"City Already Existed"];
    }
}

module.exports = City;