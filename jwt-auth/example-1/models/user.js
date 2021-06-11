const {model} = require("mongoose");

const {userSchema} = require("./shemas");

const User = model("user", userSchema);

module.exports = User;