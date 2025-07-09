const mongoose = require("mongoose");
const validator = require("validator");

const ReceptionSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: validator.isMobilePhone,
      message: "Invalid phone number",
    },
  },
  problem: {
    type: String,
    required: false,
  },
});

const Reception = mongoose.model("Reception", ReceptionSchema);

module.exports = Reception;
