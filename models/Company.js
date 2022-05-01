const mongoose = require("mongoose");

const ObjectId = mongoose.SchemaTypes.ObjectId;

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    nameCEO: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: String,
    password: String,
    imageCompany: {
      type: String,
    },
    confirmed: {
      type: Boolean,
    },
    employees: [{ type: ObjectId, ref: "User" }],
    token: [],
    score: {
      type: Number,
      default: 0,
    },
    companyType: {
      type: String,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
