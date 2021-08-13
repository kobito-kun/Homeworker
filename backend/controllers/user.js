const express = require("express");

const { User } = require("../models/user.models.js");
const { generateAccessToken } = require("../utils");

module.exports.mainRoute = (req, res) => {
  User.find({}, (err, rest) => {
    res.json(rest)
  })
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