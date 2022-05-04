const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/roles.controller");
//router.get("/:userid", rolesController.userid);
router.post("/addUserIntoRole", rolesController.addUserIntoRole);
//router.post("/removeRoleFromRole", rolesController.removeRoleFromRole);

module.exports = router;
