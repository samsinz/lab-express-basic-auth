const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "You need a username."],
    unique: [true, "This username is not available for you."],
  },
  password: String,
});

const User = model("User", userSchema);

module.exports = User;
