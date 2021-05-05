const express = require('express');
var router = express.Router();
var formidable = require('formidable');
var http = require('http');
let fs = require("fs");
var multer  = require('multer')
var bodyParser = require('body-parser');
const Flower = require('../models')("flower");
const path = require('path');


const storage= multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "public");
    },
    filename:function(req,file,cb){
        const parts=file.mimetype.split("/")
        // cb(null,"sdfgsdfgsdfgsdfg.png")
        cb(null,`${file.fieldname}-${Date.now()}.${parts[1]}`)
    }

})

var upload = multer({storage,   limits: {
        fileSize: 1024 * 1024 * 6
    },})


router.post("/upload1", upload.single("sampleFile"),(req,res)=> {
    var obj =[]
    if(req.file==undefined){
        console.log("link")
        var image ={
            contentType: 'text',
            url:req.body.link

        }
    }
    else{
        var image= {
            data: fs.readFileSync(path.join(__dirname + '/../public/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    //console.log(req.file.filename)
    
    obj[0]= req.body.flowerName;
    obj[1]= req.body.flowerColor;
    obj[2]= req.body.flowerPrice;
    obj[3]=image;
    console.log(obj)
    Flower.CREATE(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
        }
    });
            res.redirect('/#flowerCatelog');
});
module.exports=router;