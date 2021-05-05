const User = require('../models')("users");
const express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://shir123:shir123@flowercluster.e9nsj.mongodb.net/flowers";

 

router.get("/users.json",function(req,res,next){
     MongoClient.connect(url, function(err, db) {
         if (err) throw err;
         var dbo = db.db("flowers");
         dbo.collection("users").find({}).toArray(function(err, result) {
           if (err) throw err;
           db.close();
           res.json(result);
         });
       });
  });

  router.get("/flower.json",function(req,res,next){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("flowers");
    dbo.collection("flowers").find({}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      res.json(result);
    });
  });

});

router.get("/branchMeng.json",function(req,res,next){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("flowers");
    dbo.collection("BranchesMenag").find({}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      res.json(result);
    });
  });
});



module.exports=router;

