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
        const findinstallMent =  await db.findOneinstallMentLeft(installmentLeftId);
        if(!findinstallMent)
        {
            return [false,"installmentLeftId not Exist"]
        }
        let penaltyfee =0;
        if (findinstallMent.installmentDate<date)
        {
            penaltyfee = 1500;
        }
        const installAmount = findinstallMent.installAmount;
        const taxAmount = 0.12*installAmount;
        const totalPayAmount = installAmount+taxAmount+penaltyfee;
        
        const policyPayment = await db.insertOnePolicyPayment(new PolicyPayment(
            date,installAmount,penaltyfee,taxAmount,totalPayAmount,paymentType,cardHolder,cardNumber,
            cvvNumber,expireDate));

        await db.updateOneinstallMentLeft({_id:installmentLeftId},{$set:{policyPayment:policyPayment}});
        await db.updateOneinstallMentLeft({_id:installmentLeftId},{$set:{paymentStatus:"Paid"}});
        await db.updateOneinstallMentLeft({_id:installmentLeftId},{$set:{payDate:date}});
        return [true,"Payment Done"];
    }
    
}
module.exports = PolicyPayment;