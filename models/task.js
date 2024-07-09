// models/task.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  // userID:{
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // }

}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
