const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      taskId: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
