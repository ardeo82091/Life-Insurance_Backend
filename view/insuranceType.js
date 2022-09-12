class InsuranceType{
    constructor(insuranceType,image)
    {
        this.insuranceType    =  insuranceType;
        this.image            =  image;
        this.insuranceScheme  =  []
        this.isActive         =  true;
    }
}

module.exports = InsuranceType;