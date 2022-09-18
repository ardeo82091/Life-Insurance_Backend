const mongoose = require("mongoose");

const InsuranceSchemeSchema = mongoose.Schema(
  {
    insuranceScheme: { type: String },
    image: {
      type: Buffer,
    },
    commissionNewReg: { type: Number },
    commissionInstall: { type: Number },
    insuranceNote: { type: String },
    minTermPlan: { type: Number },
    maxTermPlan: { type: Number },
    minAge: { type: Number },
    maxAge: { type: Number },
    minInvestment: { type: Number },
    maxInvestment: { type: Number },
    profitRatio: { type: Number },
    isActive: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const insuranceSchemeModel = new mongoose.model(
  "InsuranceScheme",
  InsuranceSchemeSchema
);
module.exports = insuranceSchemeModel;
