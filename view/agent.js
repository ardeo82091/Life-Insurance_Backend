const Credentials = require('../view/credential')
const {DatabaseMongoose} = require('../repository/database')
let id =0;
class Agent{
    constructor(fullName,credential,address,emailId,qualification)
    {
        this.fullName      =  fullName;
        this.agentCode     =  "AGNT00"+(id++);
        this.credential    =  credential;
        this.address       =  address;
        this.emailId       =  emailId;
        this.qualification =  qualification;
        this.role          =  "agent";
        this.isActive      =  true;
    }

    static async createNewAgent(fullName,userName,password,address,emailId,qualification)
    {

        const [flag,message,newCredential] = await Credentials.createCredential(userName,password);
        if(flag === false)
        {
            return [false,"AgentName already Exists"]
        }
        const db = new DatabaseMongoose();
        let dCredential = await db.insertOneCred(newCredential);
        const [record,isInserted] = await db.insertOneAgent(new Agent(fullName,dCredential,address,emailId,qualification));
        if(!isInserted)
        {
            await db.deleteOneCred({"_id":dCredential._id});
            return [false,record];
        }
        return [true,"New Agent created"];
    }

    static async findAgent(userName)
    {
        const db = new DatabaseMongoose();
        const findCred = await db.findOneCred({"userName":userName});
        if(!findCred)
        {
            return [null,false];
        }
        const findAgent = await db.findOneAgent({"credential":findCred._id});
        if(findAgent && findAgent.isActive)
        {
            return [findAgent,true];
        }
        return [null, false];
    }

    static async findAgentId(AgentId)
    {
        const db = new DatabaseMongoose();
        const findAgent = await db.findOneAgent({"_id":AgentId})
        if(findAgent)
        {
            return [findAgent,true];
        }
        return [null,false];
    }

    static async getAllAgents()
    {
        const db = new DatabaseMongoose();
        const allAgents = await db.getAllAgent();
        return allAgents;
    }

    static async updateAgentActive(isactive,AgentId)
    {
        const db = new DatabaseMongoose();
        await db.updateOneAgent({_id:AgentId},{$set:{isActive:isactive}})
        return ;
    }

    static async updateAgent(userName, propertyToUpdate, value)
    {
        let [dUser,isUserExist] = await Agent.findAgent(userName);
        if(!isUserExist)
        {
            return [false,"User Not Exist"];
        }
        const db = new DatabaseMongoose();
        switch (propertyToUpdate) 
        {
            case "FullName": 
                await db.updateOneAgent({_id:dUser._id},{$set:{fullName:value}})
                return [true,"Updated"];

            case "UserName":
                await db.updateOneCred({_id:dUser.credential},{$set:{userName:value}}) 
                return [true,"Updated"];

            case "address":
                await db.updateOneAgent({_id:dUser._id},{$set:{address:value}})
                return [true,"Updated"];
                
            case "email":
                await db.updateOneAgent({_id:dUser._id},{$set:{emailId:value}})
                return [true,"Updated"];

            case "qualification":
                await db.updateOneAgent({_id:dUser._id},{$set:{qualification:value}})
                return [true,"Updated"];

            default: return [false,"Not Updated"];
        }
    }
}