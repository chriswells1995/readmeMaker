// First we get access to stuff

// we get access to axios, which lets us call APIs
const axios = require('axios')
// we get access to inquirer, which lets us prompt the user
const inquirer=require('inquirer')
// we get access to fs, which lets us interact with other files by writing, reading, and appendign them
const fs=require('fs')
// we get access to util, which lets us promisify functions
const util=require('util')

// we promisify our fs write and append files, because I was struggling with them rendering out of ourder
const writeReadMeFile=util.promisify(fs.writeFile)
const appendReadMeFile=util.promisify(fs.appendFile)

// this is the weird part that the tutor had me do to get the github API to retrieve my email successfully
require('dotenv').config()


// normal variables
// These are all the liscene options I'll allow the user to pick
var liscences= ['MIT', 'Apache', 'GPL', 'BSD', ]

// This is the array we'll plug into the inquire prompt, but I declare it here for organizational purposes
const userQuestions = [
    {
      type: "input",
      message: "What is your GitHub user name?",
      name: "username"
    },
    {
      type: "input",
      message: "What would you like to name your file?",
      name: "fileName"
    },
    {
        type: "input",
        message: "What is the description?",
        name: "description"
      },
      {
        type: "input",
        message: "What is the installation?",
        name: "installation"
      },
      {
        type: "input",
        message: "What is the usage?",
        name: "usage"
      },
      {
        type: "input",
        message: "What is the license?",
        name: "license"
      },
      {
        type: "input",
        message: "Who contributed?",
        name: "contributing"
      },
      {
        type: "input",
        message: "What tests were done?",
        name: "tests"
      },
      {
        type: "input",
        message: "What questions would you like to add?",
        name: "questions"
      }

  ];

//   This function is responsible for creating everything on the readme
function writeToFile(fileName, data, description, installation, usage, license, contributing, tests, questions) {

        var email=data.email
        var profilePic=data.avatar_url
        var badgeURL = "https://img.shields.io/badge/build-passing-brightgreen"
        

    writeReadMeFile("readme1.md", `![image](${badgeURL}) \n \n` , function(err){
        if (err){
            return console.error(err)
        }
    }).then(function(){
    appendReadMeFile("readme1.md", `![image](${profilePic}) \n \n`, function(err){
        if (err){
            return console.error(err)
        }
    })
    }).then(function(){
    appendReadMeFile("readme1.md", `${email} \n \n`, function(err){
        if (err){
            return console.error(err)
        }
    })
    }) .then(function(){  
        appendReadMeFile("readme1.md", `${fileName}: \n \n \n`, function(err){
            if (err){
                return console.error(err)
            }
        })
    }) .then(function(){  
        appendReadMeFile("readme1.md", `Description: ${description} \n \n`, function(err){
            if (err){
                return console.error(err)
            }
        })
    }) .then(function(){  
        appendReadMeFile("readme1.md", `Instilations used for this: ${installation} \n \n`, function(err){
            if (err){
                return console.error(err)
            }
        })
    }) .then(function(){  
        appendReadMeFile("readme1.md", `The usage of this: ${usage} \n \n`, function(err){
            if (err){
                return console.error(err)
            }
        })
    }) .then(function(){  
        appendReadMeFile("readme1.md", `License used: ${license} \n \n`, function(err){
            if (err){
                return console.error(err)
            }
        })
    }) .then(function(){  
        appendReadMeFile("readme1.md", `People who contributed: ${contributing} \n \n`, function(err){
            if (err){
                return console.error(err)
            }
        })
    }) .then(function(){  
        appendReadMeFile("readme1.md", `Tests used: ${tests} \n \n`, function(err){
            if (err){
                return console.error(err)
            }
        })
    }).then(function(){  
        appendReadMeFile("readme1.md", `Questions: ${questions} \n \n`, function(err){
            if (err){
                return console.error(err)
            }
        })
    })

}
// this is the initializer function, which prompts the user and calls the APIs
function init() {

    inquirer
    .prompt(userQuestions)
  .then(function({ username, fileName, description, installation, usage, license, contributing, tests, questions }) {
    const queryUrl = `https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;

    axios
    .get(queryUrl)
    .then(function(res) {
 

        

        writeToFile(fileName, res.data, description, installation, usage, license, contributing, tests, questions)
        

      });

    //   const repoNamesStr = repoNames.join("\n");


    });
  }




init();

// user gives github username

// retieves email 
// retrieve profile image

// user prompted to answer questions
    // 
