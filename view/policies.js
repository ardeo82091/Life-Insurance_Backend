const {DatabaseMongoose} = require('../repository/database');
const InstallmentLeft = require("./installLeft");
let id =1;
class Policies{
    constructor(createdate,insuranceType,insuranceScheme,maturityDate,
        termPlan,premiumType,profitRatio,totalAmount,sumAssuredAfterYears,installMentAmount,
        interestAmount,installmentLeft)
    {
        this.dateCreated               = createdate;
        this.accountno                 =  "ACCN00"+(id++);
        this.insuranceType               =  insuranceType;
        this.insuranceScheme           =  insuranceScheme;
        this.maturityDate              =  maturityDate;
        this.termPlan                  =  termPlan;
        this.premiumType               =  premiumType;
        this.profitRatio               =  profitRatio;
        this.totalAmount               =  totalAmount;
        this.sumAssuredAfterYears      =  sumAssuredAfterYears;
        this.installMentAmount         =  installMentAmount;
        this.interestAmount            =  interestAmount;  
        this.installmentLeft           =  installmentLeft;
        this.claim                     =  false;
    }

    static async addNewPolicy(userName,insuranceType,insuranceScheme,termPlan,premiumType,totalAmount)
    {
        const db = new DatabaseMongoose();
        let findInsScheme = await db.findOneInsuranceScheme({"insuranceScheme":insuranceScheme});
        if(!findInsScheme)
        {
            return [false,null];
        }
        const profitRatio = findInsScheme.profitRatio;
        const createdate = new Date();
        const date =new Date(createdate.getTime());
        const maturityDate = new Date(date.setFullYear(date.getFullYear() + termPlan));
        const interestAmount = totalAmount*(profitRatio/100);;
        const sumAssuredAfterYears = totalAmount+interestAmount;
        const installMentAmount = totalAmount/(termPlan/premiumType);
        

        const installmentDate = new Date(createdate.getTime());
        const installLeft = [];
        let installmentNo = 0;
        for(let index = 0; index<(termPlan/premiumType); index++){
            installmentNo++;
            const installDate = new Date(installmentDate.setFullYear(installmentDate.getFullYear() + 1));
            let newPaymentPlan = new InstallmentLeft(installmentNo,installDate,installMentAmount);
            let newPayPlan = await db.insertOneinstallMentLeft(newPaymentPlan);
            installLeft.push(newPayPlan);
        }
        
            const newPolicy = await db.insertOnePolicy(new Policies(
                createdate,
                insuranceType,
                insuranceScheme,
                maturityDate,
                termPlan,
                premiumType,
                profitRatio,
                totalAmount,
                sumAssuredAfterYears,
                installMentAmount,
                interestAmount,
                installLeft
            ));
        
        await db.updateOneCustomer({userName:userName},{$push:{policies:newPolicy}});
        return [true,newPolicy];
    }
}

module.exports = Policies;