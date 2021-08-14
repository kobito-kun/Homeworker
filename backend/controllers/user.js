const express = require("express");

const { User } = require("../models/user.models.js");
const { generateAccessToken } = require("../utils");

module.exports.mainRoute = (req, res) => {
  try{
    User.find({_id: req["userId"]}, (err, result) => {
      if(err) return res.status(400).json(err);
      else return res.status(200).json(result);
    })
  }catch{
    return res.status(400).json({"message": "Error."});
  }
}

module.exports.loginRoute = (req, res) => {
  try{  
    const {email, password} = req.body;
    let returnObject = {};
    User.findOne({email: email}, (err, result) => {
      if(err) return res.status(400).json(err);
      else {
        if(result !== null && result.password === password){
          returnObject["token"] = generateAccessToken({
            id: result["_id"],
            secret_message: "hi kobi"
          });
          returnObject["message"] = "Success.";
          return res.status(200).json(returnObject);
        }else{
          return res.status(202).json({"message": "not authenticated."})
        }
      }
    })
  }catch{
    return res.status(400).json({"message": "Error."})
  }
}

module.exports.registerRoute = (req, res) => {
  try{
    const {email, username, password} = req.body;
    User.findOne({username: username}, (err, callback) => {
      if(err) return res.status(400).json(err);
      else {
        if(callback !== null){
          return res.status(400).json({"message": "Username already exists."});
        }else{
          const newUser = new User({
            email,
            username,
            password
          });
          newUser.save();
          newUser["token"] = generateAccessToken({
            id: newUser["_id"],
            secret_message: "hi kobi"
          });
          return res.status(200).json(newUser);
        }
      }
    })
  }catch{
    return res.status(400).json({"message": "Error."})
  }
}

module.exports.deleteRoute = (req, res) => {
  try{
    User.deleteOne({_id: req["userId"]}, (err, callback) => {
      if(err) return res.status(400).json(err);
      else return res.status(200).json(callback);
    })
  }catch{
    return res.status(400).json({"message": "Error."});
  }
}