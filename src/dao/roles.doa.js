const rolesModel = require("../models/roles.model");
class rolesDao {
  async findrolebyid(_id) {
    //const userModel

    try {
      var result = await rolesModel.findOne({ _id: _id }).exec();
      return {
        success: true,
        data: result,
      };
      //role.simpleusers.push(user._id);
      //role.save();
    } catch (error) {
      console.log("error : ", error);
      return {
        success: false,
        data: null,
      };
    }
  }
}
module.exports = new rolesDao();
