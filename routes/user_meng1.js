// const User = require('../models')("users");
// const express = require('express');
// const app = express();
// //const db=require("../models/users")
// app.use(express.json("li"));
// app.set('view engine', 'ejs');

//  var MongoClient = require('mongodb').MongoClient;
//  var url = "mongodb+srv://shir123:shir123@flowercluster.e9nsj.mongodb.net/flowers";

 
//  app.get("/users.json",function(req,res){
//   console.log("hello:)")
//    MongoClient.connect(url, function(err, db) {
//        if (err) throw err;
//        var dbo = db.db("flowers");
//        dbo.collection("users").find({}).toArray(function(err, result) {
//          if (err) throw err;
//          console.log(result);
//          db.close();
//          res.json(result);
//        });
//      });
// });

// app.get("/flower.json",function(req,res){
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("flowers");
//   dbo.collection("flower").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//     res.json(result);
//   });
// });

// });

// app.get("/branchMeng.json",function(req,res){
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("flowers");
//   dbo.collection("BranchesMenag").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//     res.json(result);
//   });
// });
// });



// module.exports.app=app;
