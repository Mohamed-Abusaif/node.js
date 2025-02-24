const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new mongoose.Schema({
  empId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true, //I think this ensures that employee has only one profile
    ref: "Employee",
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  yearOfExperience: { type: Number, default: 0 },
  department: { type: String, required: true },
  phone: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);

// profile should have:
// empId: required, unique
// title:  String, required
// description: String, required
// yearOfExperience: default 0
// department:  String, required
// phone: String, required
// email: required, valid email
