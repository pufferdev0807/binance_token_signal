var User = require("../models/users");
var md5 = require("md5");
const { validate, Joi } = require('express-validation');
var mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

module.exports = {
  update: async (req, res) => {
    try {
      const user = await User.findOne({userEmail : req.body.userEmail});
      let password = md5(req.body.userPassword)
      if(req.body.userPassword == "") {
        password = user.userPassword;
      }
      const update = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nickName: req.body.nickName,
          userEmail: req.body.userEmail,
          userPassword: password,
          photo: req.body.photo,
          apiKey: req.body.apiKey,
          secret: req.body.secret
      }
      await user.updateOne(update);
      const userinfo = await User.findOne({userEmail : req.body.userEmail});
      const payload = {
        user : userinfo,
        tokenExpire : new Date().getTime() + process.env.EXPIRE_MINS * 60000
      }
      let token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
      );
      res.json({status: true, message: "Update Successful!", data: userinfo, token: token});
    }
    catch {
      res.json({status: true, message: "Update Failed!"});
    }
  },

  users: async (req, res) => {
    try {
      const users = await User.find({});
      res.json({status: true, message: "true", users: users});
    }
    catch {
      res.json({status: false, message: "Update Failed!"});
    }
  },
  getuser: async (req, res) => {
    try {
      const id = req.params.id;
      if(!id) {
        res.json({status: false, message: "id validate error"});
      }
      const user = await User.findById(id);
      if(!user) {
        res.json({status: false, message: "Don't find user."});
      }
      res.json({status: true, message: "true", user: user});
    }
    catch {
      res.json({status: false, message: "Get User Failed!"});
    }
  },
  updateuser: async (req, res) => {
    try {
      if(!req.body.id) {
        res.json({status: false, message: "User Id validation error."});
      }
      const user = await User.findOne({_id : req.body.id});
      if(!user) {
        return res.json({ status: false, message: "User don't exist!" });
      }
      let aggValue = [
        {
          '$match': {
            'userEmail': {
              '$eq': req.body.userEmail
            }, 
            '_id': {
              '$ne': mongoose.Types.ObjectId(req.body.id)
            }
          }
        }
      ]
      const emailExist = await User.aggregate(aggValue);
      if (emailExist.length > 0) {
        return res.json({ status: false, message: "Email already exist!" });
      }
      let userRole = "USER";
      if(req.body.userRole.toUpperCase() == "ADMIN") {
        userRole = "ADMIN";
      }
      let update = user;
      update.firstName = req.body.firstName;
      update.lastName = req.body.lastName;
      update.nickName = req.body.nickName;
      update.userEmail = req.body.userEmail;
      update.role = req.body.userRole;
      await user.updateOne(update);

      res.json({status: true, message: "Update Successful!"});
    }
    catch {
      res.json({status: false, message: "Update Failed!"});
    }
  },
  createuser : async (req, res) => {
    try {
      const emailExist = await User.findOne({ userEmail: req.body.userEmail });
      if (emailExist) {
        return res.json({ status: false, message: "Email already exist!" });
      }
      let userRole = "User";
      if(req.body.userRole.toUpperCase() == "ADMIN") {
        userRole = "ADMIN";
      }
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nickName: req.body.nickName,
        photo: "",
        userEmail: req.body.userEmail,
        userPassword: md5("123"),
        role: userRole,
      });
      await User.create(user);
      res.json({ status: true, message: "Create Successful! First password is '123'" });
    }
    catch {
      res.json({status: false, message: "Create Failed!"});
    }
  },
  delete : async (req, res) => {
    try {
      const id = req.params.id;
      if(!id) {
        res.json({status: false, message: "UserId error!"});
      }
      const user = await User.findById(id);
      if(!user) {
          res.json({status: false, message: "Don't find user."});
      }
      await User.deleteOne({_id: id});
      res.json({status: true, message: "Successful Delete !"});
    }
    catch {
      res.json({ status : false, message: "Delete Failed!"});
    }
  }
}