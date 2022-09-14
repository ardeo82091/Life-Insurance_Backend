const Customer = require('../../view/customer');
const Employee = require('../../view/employee');
const JWTPayload = require('../../view/authentication.js');
const Credentials = require('../../view/credential.js');
const bcrypt = require('bcrypt');
const Agent = require('../../view/agent');
async function login(req, resp)
{
    const userName = req.body.userName;
    const password = req.body.password;

    let [dUser,isUsernameExist] = await Customer.findCustomer(userName);
    let [dEmplyee,isEmployeeNameExist] = await Employee.findEmployee(userName);
    let [dAgent,isAgentExist] = await Agent.findAgent(userName);
    
    if(!isUsernameExist && !isEmployeeNameExist && !isAgentExist)
    {
        resp.status(401).send("Invalid Credentials");
        return;
    }

    if(dUser.isActive==false || dEmplyee.isActive==false || dAgent.isActive==false)
    {
        resp.status(401).send("Invalid Credentials");
    }

    //Customer
    if(isUsernameExist)
    {
        let [isuserNameExist,credExist] = await Credentials.findCredId(dUser.credential);
        if(!isuserNameExist)
        {
            resp.status(401).send("UserName Not Exist");
            return;
        }
        let isPassword = await bcrypt.compare(password, credExist.password);
        if(isPassword == false)
        {
            resp.status(401).send("Invalid Credentials")
            return;
        }
        const newPayload = new JWTPayload(dUser)
        const newToken = newPayload.createToken();
        resp.cookie("mytoken",newToken)
        resp.status(201).send(dUser);
        return;
    }

    //Employee
    if(isEmployeeNameExist)
    {
        let [isuserNameExist,credExist] = await Credentials.findCredId(dEmplyee.credential);
        if(!isuserNameExist)
        {
            resp.status(401).send("UserName Not Exist");
            return;
        }
        let isPassword = await bcrypt.compare(password, credExist.password);
        if(isPassword == false)
        {
            resp.status(401).send("Invalid Credentials")
            return;
        }
        const newPayload = new JWTPayload(dEmplyee)
        const newToken = newPayload.createToken();
        resp.cookie("mytoken",newToken)
        resp.status(201).send(dEmplyee);
        return;
    }

    //Agent
    if(isAgentExist)
    {
        let [isuserNameExist,credExist] = await Credentials.findCredId(dAgent.credential);
        if(!isuserNameExist)
        {
            resp.status(401).send("UserName Not Exist");
            return;
        }
        let isPassword = await bcrypt.compare(password, credExist.password);
        if(isPassword == false)
        {
            resp.status(401).send("Invalid Credentials")
            return;
        }
        const newPayload = new JWTPayload(dAgent)
        const newToken = newPayload.createToken();
        resp.cookie("mytoken",newToken)
        resp.status(201).send(dAgent);
        return;
    }
}

module.exports = {login};