const express = require("express"); //'express' c'est le package deja installé
const cors = require("cors"); //pour que le serveur accepte la requete qui vient du port 3000
const mongoose = require("mongoose");
const userRouter = require("./routers/user.router");
//const rolesRouter = require("./routers/roles.router");
const commentsRouter = require("./routers/comments.router");

const uploadRouter = require("./routers/upload.router");
const { db } = require("./models/user.model");
const app = express(); //instance d'express nommé app

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/uploads", uploadRouter);
//app.use("/roles", rolesRouter);
app.use("/comments", commentsRouter);

//database connexion
const conn = mongoose
  .connect(
    "mongodb+srv://ranimba:21428118@cluster0.sa78t.mongodb.net/DBpfe?retryWrites=true&w=majority"
  )
  .then(
    () => {
      //console.log();
      console.log("Database connected");
    },
    (err) => {
      console.log("error");
    }
  );

//Demarrage serveur
app.listen(5000, () => {
  console.log("server started on port 5000");
});
