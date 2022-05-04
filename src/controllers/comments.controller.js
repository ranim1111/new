const userDao = require("../dao/user.dao");
const userModel = require("../models/user.model");

const commentsModel = require("../models/comments.model");

class commentsController {
  async addComment(req, res) {
    try {
      const { topic, content } = req.body;

      const comment = new commentsModel({
        topic,
        content,
        // userId: userDao.findUserById(_id),
      });
      await comment.save();
      console.log("added");
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
  async commentslist(req, res, next) {
    commentsModel.find((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  }
  async deletecomment(req, res, next) {
    commentsModel.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data,
        });
      }
    });
  }
  async updatecomment(req, res, next) {
    commentsModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
          console.log("Comment updated successfully !");
        }
      }
    );
  }
}

module.exports = new commentsController();
