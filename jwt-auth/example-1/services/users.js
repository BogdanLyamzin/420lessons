const User = require("../models");

const getOne = (filter) => {
  return User.findOne(filter);
};

const add = (body) => {
  const newUser = new User(body);
  return newUser.save();
};

module.exports = {
  getOne,
  add,
};
