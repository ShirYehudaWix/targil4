const path = require('path');
const favicon = require('serve-favicon')
const express = require('express');
const app = express();
app.use(express.json("li"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



const user_meng=require("./routes/users_meng");
app.use("",user_meng);

const tabs=require("./routes/tabs");
app.use("",tabs);

const dbs=require("./routes/dbs");
app.use("",dbs);

const flowers_meng=require("./routes/flowers_meng");
app.use("",flowers_meng);







app.listen(5000, ()=>{console.log('5000 is the magic port');});


