const { DatabaseMongoose } = require("../repository/database");
const Customer = require("./customer");
class PolicyClaim{
    constructor(customerName,reqDate,insuranceAccount,bankDetails,withdrawAmount,insuranceScheme){
        this.reqDate = reqDate;
        this.customerName = customerName;
        this.insuranceAccount = insuranceAccount;
        this.insuranceScheme = insuranceScheme;
        this.withdrawDate = "";
        this.bankDetails = bankDetails;
        this.withdrawAmount = withdrawAmount;
    }

    static async findUserPolicy(userName,policyId){
        const db = new DatabaseMongoose();
        let [findUser,isUserExist] = await Customer.findCustomer(userName);
        for(let index=0; index<findUser.policies.length; index++){
            if(findUser.policies[index]==policyId){
                let findPolicy = await db.findOnePolicy({_id:policyId});
                return [true,findPolicy];
            }
        }
        return [false,null];
    }

    static async reqclaimPolicy(userName,policyId,bankDetails,withdrawAmount){
        const date = new Date();
        const db = new DatabaseMongoose();
        let [findUser,isUserExist] = await Customer.findCustomer(userName);
        const [isPolicyExistinUser,findPolicy] = await PolicyClaim.findUserPolicy(userName,policyId);
        if(!isPolicyExistinUser){
            return [false,"This policy not belongs to you"];
        }
        for(let index=0; index<findPolicy.installmentLeft.length; index++){
            if(findPolicy.installmentLeft[0].paymentStatus!="Paid"){
                return [false,"You"]
            }
        }
        const reqNewPolicy = await db.insertOneClaimPolicy(new PolicyClaim(userName,date,
            findPolicy.accountno,
            bankDetails,
            withdrawAmount,
            findPolicy.insuranceScheme
        ));

    }
}

module.exports = PolicyClaim;