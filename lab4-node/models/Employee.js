const mongoose = require("mongoose");
const { Schema } = mongoose;

// const Profile = require("./Profile").schema;
//NOTE::
//for enhancing the schema we can embed the profile inside employee because it has only one profile 
//instead of referencing the profile

const EmployeeSchema = new mongoose.Schema(
  {
    // id: { type: Number, required: true, unique: true },
    _id: Schema.Types.ObjectId,
    //there will be an id created automatically from mongodb
    username: {
      type: String,
      required: true,
      unique: true,
      min: [8, "Name Is Too Short!"],
      //no spaces
      validate: {
        validator: function (v) {
          return /^\S*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    firstName: { type: String, required: true, min: 3, max: 15 },
    lastName: { type: String, required: true, min: 3, max: 15 },
    dob: { type: Date, required: true },
    password: {
      type: String,
      required: true,
      min: [8, "Password Is Too Short!"],
    },
    //enhancement can be done by embedding the leaves into the employee document:
    // profile: [Profile],


    // createdAt: { type: Date , default: Date.now()},
    // updatedAt: { type: Date},
  },
  {
    timestamps: true,
  }
);

EmployeeSchema.pre("save", function (next) {
  // capitalize
  this.firstName.toUpperCase();
  this.lastName.toUpperCase();
  next();
});

module.exports = mongoose.model("Employee", EmployeeSchema);

// employee should have:
// username: String, required, unique, no spaces, min 8
// firstName: String,required, min length 3, capitalized, max length 15
// lastName: String,required, min length 3, capitalized, max length 15
// dob: Date, required
// password: String, required, min length 8
// createdAt: Date, timeStamp,
// updatedAt: Date, timeStamp
