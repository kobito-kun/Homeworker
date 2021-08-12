const express = require('express');
const {Homework} = require("../models/homework.model.js");

module.exports.mainRoute = (req, res) => {
  res.send("Working too!");
}

/**
 * Returns an array of results with the userId.
 * @param {*}
 * @returns {Array}
 */

module.exports.allRoute = (req, res) => {
  try{
    Homework.find({user: req.userId}, (err, result) => {
      if(err) return res.status(400).json(err);
      else return res.status(200).json(result);
    })
  }catch{
    return res.status(400).json({"message": "Error."});
  }
}

/**
 * Returns a singlular result with the _id provided.
 * @param {_id}
 * @returns {Object}
 */

module.exports.getRoute = (req, res) => {
  try{
    const {_id} = req.params;
    Homework.findOne({user: req.userId, '_id': _id}, (err, result) => {
      if(err) return res.status(400).json(err);
      else return res.status(200).json(result);
    })
  }catch{
    return res.status(400).json({"message": "Error."})
  }
}

/**
 * Create a homework query.
 * @param {content, extra, dateDue} body
 * @returns {Object}
 */

module.exports.createRoute = (req, res) => {
  try{
    const {content, extra, dateDue} = req.body;
    const newHomework = new Homework({
      'content': content,
      'extra': extra,
      'dateDue': dateDue,
      'user': req.userId
    });
    newHomework.save();
    res.status(200).json(newHomework);
  }catch{
    return res.status(400).json({"message": "Error."});
  }
}

/**
 * Deletes a homework query.
 * @param {_id} parameter
 * @returns {Object}
 */

module.exports.deleteRoute = (req, res) => {
  try{
    const {_id} = req.params;
    Homework.deleteOne({user: req.userId, '_id': _id}, (err, callback) => {
      if(err) return res.status(400).json(err);
      else res.status(200).json(callback);
    })
  }catch{
    return res.status(400).json({"message": "Error."});
  }
}