const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/googlesignin", userController.googlesignin);
router.post("/deleteuser/:id", userController.deleteuser);
router.get("/userslist", userController.userslist);
router.put("/updateuser/:id", userController.updateuser);
router.get("/userById/:userId", userController.getUsersById);
module.exports = router;
