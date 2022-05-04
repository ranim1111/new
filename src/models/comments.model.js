const mongoose = require("mongoose");

//le modele "user" de la base Mango
const commentsschema = new mongoose.Schema({
  topic: { type: String },
  content: { type: String },
  //userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const commentsModel = mongoose.model("comments", commentsschema); //nom du model : user
module.exports = commentsModel;
