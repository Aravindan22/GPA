// jshint:esversion6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const data = require(__dirname + "/data.js");
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: 'GPA Secret Key[-_-]',
    resave: false,
    saveUninitialized: true
}));

const departments = ["MECH", "EEE", "ECE", "CSE", "IT", "FT", "CIVIL"];
const semester = ["SEMESTER 1", "SEMESTER 2", "SEMESTER 3", "SEMESTER 4", "SEMESTER 5", "SEMESTER 6", "SEMESTER 7", "SEMESTER 8"];
let grade = [];
let sub_obj;
let subjects = [];
let gpa = 0;

app.get("/", function (req, res) {
    res.render("home", { departments: departments })
});

app.post("/", function (req, res) {
    console.log(req.body.department);
    req.session.department_chosen = req.body.department;
    res.redirect("/sem");
});

app.get("/sem", function (req, res) {
    res.render("sem", { semester: semester });
});

app.post("/sem", function (req, res) {
    console.log(req.body.sem);
    req.session.semester_chosen = req.body.sem;
    res.redirect("/gpa");
});

app.get("/gpa", function (req, res) {
    subjects = [];
    gpa = 0;
    sub_obj = data.getSubjects(req.session.department_chosen, req.session.semester_chosen);
    for (let i = 1; i < sub_obj.length; i++) {
        subjects.push(Object.keys(sub_obj[i]));
    }
    res.render("gpa", { subjects: subjects, gpa: gpa });
});
app.post("/gpa", function (req, res) {
    grade = req.body.subject;
    let sum = 0;
    let total = 0;
    for (let i = 0; i < grade.length; i++) {
        let val = parseInt(Object.values(sub_obj[i])[0]);
        sum = sum + parseInt(grade[i] * val);
        total += val;
    }
    gpa = sum / total;
    //res.send("<h1>" + gpa + "</h1>");

    res.render("gpa", { subjects: subjects, gpa: gpa });
});
app.listen(3000, function () {
    console.log("Server started on port 3000");
});
