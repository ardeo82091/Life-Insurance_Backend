const TaxSetting = require("../../view/taxSetting")
const { DatabaseMongoose } = require("../../repository/database");
const JWTPayload = require("../../view/authentication.js");
const InsuranceSetting = require("../../view/insuranceSetting");


async function taxSetting(req,resp){
    const newPayload = JWTPayload.isValidateToken(
        req,
        resp,
        req.cookies["mytoken"]
    );
    if (newPayload.role != "admin") {
        resp.status(401).send("please specify this role to admin");
        return;
    }
    if (newPayload.isActive == false) {    
        resp.status(401).send(`${newPayload.firstName} is Inactive`);
        return;
    }
    const db = new DatabaseMongoose();
    const newTax = await db.insertOneTaxPercentage(new TaxSetting());
    resp.status(201).send("Done");
}

async function insuranceSetting(req,resp){
    const newPayload = JWTPayload.isValidateToken(
        req,
        resp,
        req.cookies["mytoken"]
    );
    if (newPayload.role != "admin") {
        resp.status(401).send("please specify this role to admin");
        return;
    }
    if (newPayload.isActive == false) {    
        resp.status(401).send(`${newPayload.firstName} is Inactive`);
        return;
    }
    const db = new DatabaseMongoose();
    const newTax = await db.insertOneinsuranceSetting(new InsuranceSetting());
    resp.status(201).send("Done");
}

async function updatetaxSetting(req,resp){
    const newPayload = JWTPayload.isValidateToken(
        req,
        resp,
        req.cookies["mytoken"]
    );
    if (newPayload.role != "admin") {
        resp.status(401).send("please specify this role to admin");
        return;
    }
    if (newPayload.isActive == false) {    
        resp.status(401).send(`${newPayload.firstName} is Inactive`);
        return;
    }
    const value = req.body.value;
    const db = new DatabaseMongoose();
    const findTax = await db.findOnetaxSetting();
    await db.updateOnetaxSetting({"_id":findTax[0]._id},{$set:{taxpercentage:value}});
    resp.status(201).send("Tax Percentage Updated");
}

async function updateinsuranceSetting(req,resp){
    const newPayload = JWTPayload.isValidateToken(
        req,
        resp,
        req.cookies["mytoken"]
    );
    if (newPayload.role != "admin") {
        resp.status(401).send("please specify this role to admin");
        return;
    }
    if (newPayload.isActive == false) {    
        resp.status(401).send(`${newPayload.firstName} is Inactive`);
        return;
    }
    const {propertyToUpdate,value} = req.body;
    const db = new DatabaseMongoose();
    const findInsuranceSetting = await db.findOneinsuranceSetting();
    if(propertyToUpdate=="claimDeduction"){
        await db.updateOneinsuranceSetting({"_id":findInsuranceSetting[0]._id},{$set:{claimDeduction:value}});
    }
    if(propertyToUpdate=="penaltyPay"){
        await db.updateOneinsuranceSetting({"_id":findInsuranceSetting[0]._id},{$set:{penaltyPay:value}});
    }
    resp.status(201).send(`${propertyToUpdate} Updated`);
}

module.exports = {taxSetting,insuranceSetting,updatetaxSetting,updateinsuranceSetting};