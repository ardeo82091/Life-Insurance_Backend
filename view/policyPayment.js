const {DatabaseMongoose} = require('../repository/database');

class PolicyPayment{
    constructor(date,installmentAmount,penaltyfee,taxAmount,totalPayAmount,paymentType,cardHolder,cardNumber,cvvNumber,expireDate)
    {
        this.payDate           = date;    
        this.installmentAmount = installmentAmount;
        this.taxAmount         = taxAmount;
        this.penaltyfee        = penaltyfee;
        this.totalPayAmount    = totalPayAmount;
        this.paymentType       = paymentType;
        this.cardHolder        = cardHolder;
        this.cardNumber        = cardNumber;
        this.cvvNumber         = cvvNumber;
        this.expireDate        = expireDate;
    }

    static async createPolicyPayment (
        installmentLeftId,
        paymentType,
        cardHolder,
        cardNumber,
        cvvNumber,
        expireDate
        ){
        const date = new Date();
        const db = new DatabaseMongoose();
        const findinstallMent =  await db.findOneinstallMentLeft({_id:installmentLeftId});
        if(!findinstallMent)
        {
            return [false,"installmentLeftId not Exist"]
        }
        if(findinstallMent.paymentStatus!="Pending"){
            return [false,"Payment Already Done"];
        }
        const installAmount = findinstallMent.installAmount;
        const findInsuranceSetting = await db.findOneinsuranceSetting();
        const penaltyper = findInsuranceSetting[0].penaltyPay;
        let penaltyfee =0;
        if (findinstallMent.installmentDate<date)
        {
            penaltyfee = penaltyper*installAmount;
        }
        const findTax = await db.findOnetaxSetting();
        const taxper = findTax[0].taxpercentage/100;
        
        const taxAmount = taxper*installAmount;
        const totalPayAmount = installAmount+taxAmount+penaltyfee;
        
        const policyPayment = await db.insertOnePolicyPayment(new PolicyPayment(
            date,installAmount,penaltyfee,taxAmount,totalPayAmount,paymentType,cardHolder,cardNumber,
            cvvNumber,expireDate));
        
        await db.updateOneinstallMentLeft({_id:installmentLeftId},{$set:{policyPayment:policyPayment._id}});
        await db.updateOneinstallMentLeft({_id:installmentLeftId},{$set:{paymentStatus:"Paid"}});
        await db.updateOneinstallMentLeft({_id:installmentLeftId},{$set:{payDate:date}});
        return [true,"Payment Done"];
    }
    
}
module.exports = PolicyPayment;