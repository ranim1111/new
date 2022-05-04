const express = require("express");
const upload = require("../services/uploadService");

const router = express.Router();

router.post("/", upload.single("file"), (req, res) => res.send("file added"));

/*router.post("/files/del/:id", (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
    if (err) return res.status(404).json({ err: err.message });
    else res.send("file added");
    res.redirect("/");
  });
}); */
module.exports = router;
