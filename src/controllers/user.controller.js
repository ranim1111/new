const StatusCodes = require("http-status-codes");
const userModel = require("../models/user.model");
const rolesModel = require("../models/roles.model");
const userDao = require("../dao/user.dao");
const passwordService = require("../services/passwordService");
const sendMail = require("../services/mailService");
const sendMail2 = require("../services/googleMailService");
const jwt = require("jsonwebtoken"); //jwt for user stay logged in
const { OAuth2Client } = require("google-auth-library");
const rolesController = require("../controllers/roles.controller");
const mongoose = require("mongoose");
const rolesDoa = require("../dao/roles.doa");
const validate = require("../services/verification");

const client = new OAuth2Client(
  "1072432309097-3npmrqi8dk2fm3eho7q54h9tn3ulfnku.apps.googleusercontent.com"
);
class UserController {
  //fonction asynchrone signup

  async signup(req, res) {
    try {
      const { firstName, lastName, phoneNumber, email, password } = req.body; //retreiving attributes from request's body
      console.log(req);
      const exist = await userDao.findUserByEmail(email); //exist contient le resultat de la fonction finduserbyemail
      const phoneNumberexists = await userDao.findUserByPhoneNumber(
        phoneNumber
      ); //phoneNumberexists contient le resultat de la fonction finduserbyphonenumber
      //condition sur email et phonenumber
      if (exist.data && phoneNumberexists.data) {
        return res
          .status(400)
          .json("This email and this phone number are already in use");
      }
      //condition sur email
      if (exist.success === false) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json("Error during account creation"); //probleme dans le serveur
      }
      if (exist.data) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json("This email is already in use"); //email utilisé
      }
      //condition sur phone number
      if (phoneNumberexists.success === false) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json("Error during account creation"); //probleme dans le serveur
      }
      if (phoneNumberexists.data) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json("This phone number is already in use"); //numero utilisé
      }

      const passwordProcess = await passwordService.encryption(password);
      if (passwordProcess.success === false) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json("Error during account creation");
      }

      //enregistrement user dans la base
      const user = new userModel({
        firstName,
        lastName,
        phoneNumber,
        email,
        password: passwordProcess.data,
      });
      await user.save();
      //const mail = sendMail(email);

      //rolesController.addUserIntoRole();

      /*const roles = new rolesModel({
        role: req.body.role,
      });
      roles.simpleusers.push(user._id);
      roles.save();*/
      /*const simpleusers = new rolesModel({
        role: req.body.role,
        simpleusers: [user._id],
      });
      await simpleusers.save();*/

      return res
        .status(StatusCodes.CREATED)
        .json("Your account has been created successfully");
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Error during account creation, please try again later");
    }
  }
  /*async findrole(req, res) {
    try {
      var role = await rolesModel.findOne({ _id: "626849b727935f905dccc11f" });
      role.simpleusers.push(user._id);
      role.save();
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Error during account creation, please try again later");
    }
  }*/
  async userslist(req, res, next) {
    userModel.find((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  }
  async deleteuser(req, res, next) {
    userModel.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data,
        });
      }
    });
  }
  async updateuser(req, res, next) {
    userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
          console.log("User updated successfully !");
        }
      }
    );
  }

  async getUsersById(req, res) {
    try {
      const userId = req.params.userId;
      const usersById = await userDao.findUserById(userId);
      if (usersById.success === false) {
        return res.status(StatusCodes.BAD_REQUEST).json("can not get users");
      }
      if (!usersById.data) {
        return res.status(StatusCodes.NOT_FOUND).json("user not found");
      }

      return res.status(StatusCodes.OK).json(usersById.data);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("error..please try again");
    }
  }
  //la fonction asynchrone signin
  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const userexists = await userDao.findUserByEmail(email);
      if (userexists.success === false) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json("Error during sign in");
      }
      if (userexists.data == null) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json("Check your email adress");
      }
      const decryptedPaswword = await passwordService.decryption(
        userexists.data.password,
        password
      );
      if (decryptedPaswword.success === false) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json("Error during sign in");
      }
      if (!decryptedPaswword.data) {
        return res.status(StatusCodes.FORBIDDEN).json("Wrong password");
      }

      return res
        .status(StatusCodes.OK)
        .json(
          `Welcome ${userexists.data.firstName} ${userexists.data.lastName}`
        );
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Error during sign in, please try again later");
    }
  }

  async googlesignin(req, res) {
    const { tokenId } = req.body;
    console.log(req);
    client
      .verifyIdToken({
        idToken: tokenId,
        audience:
          "1072432309097-3npmrqi8dk2fm3eho7q54h9tn3ulfnku.apps.googleusercontent.com",
      })
      .then((response) => {
        const { email_verified, name, email } = response.payload;
        console.log(response.payload);

        if (email_verified) {
          userModel.findOne({ email }).exec((err, user) => {
            if (err) {
              return res.status(400).json({
                error: "Something went wrong ...",
              });
            } else {
              if (user) {
                const token = jwt.sign({ _id: user._id }, "test", {
                  expiresIn: "4h",
                });
                const { _id, name, email } = user;

                res.json({
                  token,
                  user: { _id, name, email },
                });
              } else {
                let password = email;
                let newUser = new userModel({ name, email, password });

                newUser.save((err, data) => {
                  if (err) {
                    return res.status(400).json({
                      error: "Something went wrong... in creating user",
                    });
                  }
                  const token = jwt.sign({ _id: data._id }, "test", {
                    expiresIn: "4h",
                  });

                  const { _id, name, email } = newUser;
                  const mail2 = sendMail2(email);

                  res.json({
                    token,
                    user: { _id, name, email },
                  });
                });
              }
            }
          });
        }
      });
  }
}
module.exports = new UserController();
