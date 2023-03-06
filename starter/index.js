//const Manager = require("./lib/Manager");
import Manager from "./lib/Manager.js";
import Engineer from "./lib/Engineer.js";
import Intern from "./lib/Intern.js";
import inquirer from "inquirer";
import path from "path";
import fs from "fs";

//const OUTPUT_DIR = path.resolve(__dirname, "output");
//const outputPath = path.join(OUTPUT_DIR, "team.html");

//const render = require("./src/page-template.js");
import render from "./src/page-template.js";

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// First we need a prompt that will take in manager info
// after we take in the managers info, we can create a new Object set to the reponses from that prompt
// at the end of our manager prompt, we want to ask the user, would they like to create a intern or engineer

let teamArr = [];

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the employees name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the employee ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the employees email address?",
      },
      {
        type: "input",
        name: "num",
        message: "What is the employees office number?",
      },
    ])
    .then((res) => {
      const manager = new Manager(res.name, res.id, res.email, res.num);
      teamArr.push(manager);
      addMore();
    });
};

const addMore = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Which employee would you like to add next?",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What is the employees name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the employee ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the employees email address?",
      },
      {
        type: "input",
        name: "github",
        message: "What is the employees github username?",
        when: (res) => res.role === "Engineer",
      },
      {
        type: "input",
        name: "school",
        message: "Where does this employee go to school?",
        when: (res) => res.role === "Intern",
      },
      {
        type: "confirm",
        name: "addAnother",
        message: "Would you like to add another employee?",
      },
    ])
    .then((res) => {
      let employee;
      if (res.role === "Engineer") {
        employee = new Engineer(res.name, res.id, res.email, res.github);
      } else if (res.role === "Intern") {
        employee = new Intern(res.name, res.id, res.email, res.school);
      }
      teamArr.push(employee);
      if (res.addAnother) {
        addMore();
      } else {
        console.log(teamArr);
      }
    });
};

promptUser();
