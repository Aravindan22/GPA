const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

departments=["CSE","IT","FT"]

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function (req, res){
    res.render("home",{departments:departments})
});
app.post("/",function(req,res){
    console.log(req.body.department);
});
app.listen(3000,function (){
    console.log("Server started on port 3000");
});