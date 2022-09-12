class InsranceSetting{
    constructor(claimDeduction,penatlyPay)
    {
        //if Customer claim his amount before his maturity Date
        this.claimDeduction = claimDeduction;
        
        //if customer pay the installment amount late
        this.penatlyPay     = penatlyPay; 
    }
}

module.exports = InsranceSetting;