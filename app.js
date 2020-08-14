// jshint:esversion6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const data = require(__dirname+"/data.js");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const departments = ["MECH", "EEE", "ECE", "CSE", "IT", "FT", "CIVIL"];
const semester = ["SEMESTER 1", "SEMESTER 2", "SEMESTER 3", "SEMESTER 4", "SEMESTER 5", "SEMESTER 6", "SEMESTER 7", "SEMESTER 8"];
var department_chosen;
var semester_chosen;

app.get("/", function (req, res) {
    res.render("home", { departments: departments })
});

app.post("/", function (req, res) {
    console.log(req.body.department);
    department_chosen = req.body.department;
    res.redirect("/sem");
});

app.get("/sem", function (req, res) {
    res.render("sem", { semester: semester });
});

app.post("/sem", function (req, res) {
    console.log(req.body.sem);
    semester_chosen = req.body.sem;
    res.redirect("/gpa");
});

app.get("/gpa",function(req,res){
    let subjects;
    data.getSubjects(department_chosen,semester_chosen).forEach(element => {
        console.log(element)
        subjects = element;
    }); 
    console.log(subjects);
    res.render("/gpa",{subjects: Object.keys(subjects)});
});
app.listen(3000, function () {
    console.log("Server started on port 3000");
});
