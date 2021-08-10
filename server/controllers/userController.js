const express = require('express')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const request = require('request')

// custom modules
const User = require("../models/user");
const response = require('../libs/responseLib')

let getAllUser = (req, res, next) => {
    User.find()
      .then((result) => {
        let apiResponse = response.generate(false, 'All Details Found', 200, result)
        res.send(apiResponse)
      })
      .catch((err) => {
        // res.status(500).json({ error: err });
        let apiResponse = response.generate(true, 'Failed To Find All User Details', 500, err)
        res.send(apiResponse)
      });
  }


let signUpFunction = (req, res) => {
    // register logic goes here...
    console.log("register...", req.body);
    // req.body.email = req.body.email;

    // auto generating salt and hash
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      // if any error happened return with 500 Internal Server Error response
      if (err) {
        // return res.status(500).json({ error: err });
        console.log(err)
        let apiResponse = response.generate(true, 'Internal Server Error', 500, err)
        res.send(apiResponse)
      } else {
        const user = new User({
        //   _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          address: req.body.address,
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then((result) => {
            console.log(result);
            res.status(200).json({ success: true, new_user: result });
          })
          .catch((err) => {
            if (err.code == 11000) {
              res
                .status(400)
                .json({
                  error: err,
                  success: false,
                  msg: "Email already registered",
                });
            }
            console.log(err);
            res.status(500).json({ error: err });
          });
      }
    });
  }

let loginFunction = (req, res) => {
    // Login logic goes here
    User.find({email: req.body.email})
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            msg: 'user not exist'
          })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if(!result) {
            return res.status(401).json({
              msg: 'Password matching failed'
            })
          }
          if(result) {
            const token = jwt.sign({
              name: user[0].name,
              email: user[0].email
            }, 'this is dummy secret key', { expiresIn: "24h" })
            res.status(200).json({
              name: user[0].name,
              email: user[0].email,
              address: user[0].address,
              token: token,
              success: true
            })
          }
        })
      })
      .catch((err )=> {
        res.status(500).json({
          err: err
        })
      })
  }

  // getting user repos form github
  let githubUser = (req, res) => {

    console.log('passport user data',req.user);
    console.log(req.params.name);

    let users = req.params.name
    let url = `https://api.github.com/users/${users}/repos`

    console.log(url);
    request.get(
        {
            headers: { "Content-Type": "applicaton/json", 'User-Agent': 'node.js'},
            url: url,
            observer: "response"
        },
        (error, response, body) => {
            if (error) {
                console.log(error);
                res.status(500).json({success: false, msg: 'Some error occured'})
            } else {
                console.log(typeof(body));
                let resData = JSON.parse(body)
                res.json({success: true, msg: 'User git repo data', data: resData})
            }
        }
    )
}



  module.exports = { 
      getAllUser: getAllUser,
      signUpFunction: signUpFunction,
      loginFunction: loginFunction,
      githubUser: githubUser
     }