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

    static async findState(stateName) {
        const db = new DatabaseMongoose();
        const findState = await db.findOneState({ stateName: stateName });
        if (findState) {
          return [findState, true];
        }
        return [null, false];
    }

    static async allStates()
    {
        const db = new DatabaseMongoose();
        const allState = await db.getAllState();
        return allState;
    }

    static async updateStateActive(isactive, stateId) {
        const db = new DatabaseMongoose();
        await db.updateOneState(
          { _id: stateId },
          { $set: { isActive: isactive } }
        );
        return;
    }

    static async update(statetoUpdate, value) {
        const db = new DatabaseMongoose();
        let [state, isStateExist] = await State.findState(statetoUpdate);
        if (!isStateExist) {
          return [false, "Not find the State to Update"];
        }
        let [record,isUpdate] = await db.updateOneState(
                                           {_id: state._id},
                                           { $set:{ stateName: value}}
                                        );
        if(!isUpdate){
            return [false,"Not Updated"];
        }
        return [true,"Updated"]
    }
}

module.exports = State;