const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
      match: /^\d{10}$/, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    },
    address: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("Contact", contactInfoSchema);
