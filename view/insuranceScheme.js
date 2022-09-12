class insuranceScheme{
    constructor(insuranceScheme,image,CommisionNewReg,CommisionInstall,insuranceNote)
    {
        this.insuranceSchema  =  insuranceScheme;
        this.image            =  image; 

        //agent commision for new Customer Register by the agent
        this.CommisionNewReg  =  CommisionNewReg;

        //agent commision for installment paid by customer refered by agent
        this.CommisionInstall =  CommisionInstall;
        this.insuranceNote    =  insuranceNote;
        this.insurancePlans   =  [];
        this.isActive         =  true; 
    }
}

module.exports = insuranceScheme;