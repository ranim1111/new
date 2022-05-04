const mongoose = require("mongoose");
//le modele "user" de la base Mango
const schema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
});
const Model = mongoose.model("user", schema); //nom du model : user

module.exports = Model;
