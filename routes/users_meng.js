const User = require('../models/users');
const express = require('express');
var router = express.Router();
const bcrypt=require('bcrypt');

 var MongoClient = require('mongodb').MongoClient;
 var url = "mongodb+srv://shir123:shir123@flowercluster.e9nsj.mongodb.net/flowers";

 
 


 router.post('/addNewClient',async function(req, res,next) {
  try{
    var user=[];
    user[0] = req.body.inputType;
    user[1]= req.body.fname;
    user[2]= req.body.lname;
    user[3] = req.body.address;
    user[4] = req.body.phoneNumber;
    user[5] = req.body.email;
    user[6] = await bcrypt.hash( req.body.password,10);
    user[7]="";//branch number
    user[8]="1";//status
   (async()=>{ await MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo =  db.db("flowers");
      dbo.collection("users").find({email: user[5]},{ projection: { email: user[5]} }).toArray( function(err, result) {
        if (err) throw err;
        if(result.length!=0)
    {
      setTimeout(() => { res.json({
        status: 'failed',
        data:'false',
        message:"This email is already exist"
      }); }, 1000);
     
    }
    else{
      if(req.body.inputType=="client"){
         User.CREATE(user);
        console.log('User created:' + user);
        setTimeout(() => { res.json({
          status: 'success',
          data:'true',
          message:"success"
        }); }, 1000);

       }
       else{
         user[7] = req.body.branch;
          User.CREATE(user);
        console.log('User created:' + user);
        setTimeout(() => { res.json({
          status: 'success',
          data:'true',
          message:"success"
        }); }, 1000);
       }
        
    }
        
        
        db.close();
      });

    });
  })();
    
    
    }catch{
      res.status(500).send();
    }

});

router.post('/updetClient',async function(req, res,next) {
try{
  console.log(req.body)
  var user={
  type: req.body.inputType,
    "first-name": req.body.fname,
   "last-name": req.body.lname,
    address: req.body.address,
    "phone-number": req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
    branchnumber :req.body.branch!="none"?req.body.branch:"",
    status : req.body.status,
  };
    console.log(user)
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("flowers");
      var myquery = { email: req.body.email };
      var newvalues = { $set: user};
      dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
  
  });

}
  catch{
    res.status(500).send();
  }

});

router.post('/deleteClient',async function(req, res,next) {
  try{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("flowers");
    var myquery = { email: req.body.email, status: "1" };
    var newvalues = { $set: {status: "0"} };
    dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
  
}
catch{
  setTimeout( () => {res.json({
    status: 'faild',
    data:'false',
    message:"something wrong happend in the server try again letter"
  });}, 1000);

}
});


module.exports = router;
