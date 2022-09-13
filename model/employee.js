const mongoose = require("mongoose");
const validatorPackage = require("validator");

const EmployeeSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    credential: { type: mongoose.SchemaTypes.ObjectId, ref: "Credentials" },
    role: { type: String },
    isActive: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

let employeeModel = new mongoose.model("Employee", EmployeeSchema);
module.exports = employeeModel;
