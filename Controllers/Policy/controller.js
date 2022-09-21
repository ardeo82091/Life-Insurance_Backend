const Customer = require('../../view/customer.js');
const JWTPayload  = require('../../view/authentication');
const Policies = require('../../view/policies');
const PolicyPayment = require('../../view/policyPayment.js');

async function buyNewPolicy(req,resp){
    const userName = req.params.userName;
    
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "customer"){
        resp.status(401).send(`${newPayload.role} do not have any access`)
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    let [customer,isCustomerEsists] = await Customer.findCustomer(userName);
    if(!isCustomerEsists){
        return resp.status(403).send("Customer not Exists");
    }
    const {insuranceType,
        insuranceScheme,
        termPlan,
        premiumType,
        totalAmount} = req.body;

    const [isPolicyExist,newPolicy] = await Policies.addNewPolicy(userName,
        insuranceType,
        insuranceScheme,
        termPlan,
        premiumType,
        totalAmount
    )
    if(!isPolicyExist){
        resp.status(403).send("Insurance Scheme Not Exist");
        return;
    }
    resp.status(201).send(newPolicy);
    return;
}

async function payInstallment(req,resp){
    const userName = req.params.userName;
    
    let newPayload = JWTPayload.isValidateToken(req, resp, req.cookies["mytoken"]);
    if(newPayload.role != "customer"){
        resp.status(401).send(`${newPayload.role} do not have any access`)
        return;
    }
    if (newPayload.isActive == false){
        resp.status(401).send(`${newPayload.firstName} is Inactive`)
        return;
    }
    let [customer,isCustomerEsists] = await Customer.findCustomer(userName);
    if(!isCustomerEsists){
        return resp.status(403).send("Customer not Exists");
    }
    const {installmentLeftId,
        paymentType,
        cardHolder,
        cardNumber,
        cvvNumber,
        expireDate} = req.body;
    const [isPayment,msz] =await  PolicyPayment.createPolicyPayment(
        installmentLeftId,
        paymentType,
        cardHolder,
        cardNumber,
        cvvNumber,
        expireDate
    )
    if(!isPayment)
    {
        resp.status(403).send(msz);
        return;
    }
    resp.status(201).send(msz);
    return;
}

module.exports = {buyNewPolicy,payInstallment}