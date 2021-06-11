const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

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

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = userSchema;
