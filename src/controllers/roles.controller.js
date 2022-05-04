/*const rolesDao = require("../dao/roles.doa");
const rolesModel = require("../models/roles.model");
const userModel = require("../models/user.model");
const userController = require("./user.controller");

class rolesController {
  async addUserIntoRole(req, res) {
    try {
      const role = await rolesModel.findOne({
        _id: "626849b727935f905dccc11f",
      });

      role.simpleusersids.push(userModel._id); //resultat null
      role.save();
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
  async removeUserFromRole(_id) {
    try {
      const role = await rolesModel.findOne({
        _id: "626849b727935f905dccc11f",
      });

      role.simpleusers.pull(userModel.user); //resultat null
      role.save();
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}

async addUserIntoRole() {
    //const userModel
    const user = userModel._id;
    try {
      var role = await rolesModel.findOne({ _id: "626849b727935f905dccc11f" });
      role.simpleusers.push(user._id);
      role.save();
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

module.exports = new rolesController();*/
