class InsurancePlans{
    constructor(){
        //Policy Term
        this.minTermPlan    =  minTermPlan;
        this.maxTermPlan    =  maxTermPlan;

        //Age Require For Insurance
        this.minAge         =  minAge;
        this.maxAge         =  maxAge;
        
        //Investment for Insurance
        this.minInvestment  =  minInvestment;
        this.maxInvestment  =  maxInvestment;

        this.profitRatio    =  profitRatio;
        this.isActive       =  true;
    }
}

module.exports = InsurancePlans;