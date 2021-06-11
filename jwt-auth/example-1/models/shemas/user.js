const { Schema } = require("mongoose");

const userSchema = Schema({
  email: {
    type: String,
    require: [true, "Email must be exist"],
  },
  password: {
    type: String,
    require: [true, "Password must be exist"],
    minlength: 6,
  },
});

module.exports = userSchema;
