const crypto = require("crypto");
const path = require("path");
const { conn } = require("../index");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

/* const conn = mongoose
  .connect(
    "mongodb+srv://ranimba:21428118@cluster0.sa78t.mongodb.net/DBpfe?retryWrites=true&w=majority"
  )
  .then(
    () => {
      console.log("Database connected");
    },
    (err) => {
      console.log("error");
    }
  );*/

// init gfs
let gfs;
conn?.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn?.db, {
    bucketName: "uploads",
  });
});

// Storage
const storage = new GridFsStorage({
  url: "mongodb+srv://ranimba:21428118@cluster0.sa78t.mongodb.net/DBpfe?retryWrites=true&w=majority",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
