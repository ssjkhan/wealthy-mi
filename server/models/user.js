const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("User", UserSchema);