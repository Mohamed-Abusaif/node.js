const mongoose = require("mongoose");
const { Schema } = mongoose;

const LeaveSchema = new mongoose.Schema(
  {
    empId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee", //not unique because it has more than one leave (many leaves)
    },
    type: { type: String, required: true, enum: ["annual", "casual", "sick"] },
    duration: { type: Number, required: true, min: 0 }, //min 0 ensures no negative numbers only positive

    // Employee can only change it to cancelled if it’s not ended
    status: {
      type: String,
      enum: ["inprogress", "cancelled", "ended"],
      default: "inprogress",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Leave", LeaveSchema);

// leave should have:
// empId: required
// type: String, required and one of [annual, casual, sick]
// duration: +ve number, required
// createdAt: Date, timeStamp,
// updatedAt: Date, timeStamp,
// status: String and one of [inprogress, cancelled, ended], default
//   Inprogress

//   Employee can only change it to cancelled if it’s not ended ->
//Me: means before update you have to ensure this
