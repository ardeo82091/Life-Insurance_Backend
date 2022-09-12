const {DatabaseMongoose} = require('../repository/database');

class State{
    constructor(stateName)
    {
        this.stateName = stateName;
        this.city      = [];
        this.isActive  = true; 
    }

    static async createNewState(stateName)
    {
        const db = new DatabaseMongoose();
        let findState = await db.findOneState({"stateName":stateName});
        if(!findState)
        {
            await db.insertOneState(new State(stateName));
            return [true,"State Created SuccessFully"];
        }
        return [false,"State Already Existed"];
    }
}

module.exports = State;