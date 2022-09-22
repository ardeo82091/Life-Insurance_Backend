class ComissionWithdraw{
    constructor(reqDate,withdrawAmount){
        this.reqDate = reqDate;
        this.withdrawAmount = withdrawAmount;
        this.particular = "";
        this.status = false;
    }
}

module.exports = ComissionWithdraw;