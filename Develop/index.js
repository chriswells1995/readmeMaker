const axios = require('axios')
const inquirer=require('inquirer')
const fs=require('fs')
const util=require('util')


const questions = [

];

function writeToFile(fileName, data) {

        // var email=res.email
        var profilePic=data.avatar_url

    fs.writeFile("readme1.md", `![image](${profilePic})`, function(err){

        

    })

    // fs.append file email

    // badges are just in the markdown, we don't link to anything 
    // look up syntax on gitlab good readme
}

function init() {

    inquirer
    .prompt([
        {
          type: "input",
          message: "What is your GitHub user name?",
          name: "username"
        },
        {
          type: "input",
          message: "What would you like to name your file?",
          name: "fileName"
        }
      ])
  .then(function({ username, fileName }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios
    .get(queryUrl)
    .then(function(res) {
        // var email=res.email
        // console.log(res)
        console.log(res.data.avatar_url)

        writeToFile(fileName, res.data)
        

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
