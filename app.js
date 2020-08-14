const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

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
    department_chosen = req.body.sem;
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
