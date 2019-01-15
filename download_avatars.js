var request = require('request');
var secret = require('./secrets');
var fs = require('fs');


var repoOwner = process.argv[2];
var repoName = process.argv[3];
console.log('Welcome to the GitHub Avatar Downloader!');

//function to GET
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization' : 'token ' + secret.GITHUB_TOKEN
      }
    };
    request(options, function(err, res, body) {

    cb(err, body);
    });
  }


// function to download the picture base on the url
  function downloadImageByURL(url, filePath) {
    request.get(url)
      .on('error', function (err) {
        throw err;
      })
      .on('response', function (response){
        response.pipe(fs.createWriteStream(filePath));
      })
      .on('Finish', function (){
        console.log("Downloading Completed");
      });
  }



  if (repoOwner === undefined || repoName === undefined) {
    console.log("Command line arguments are incorrect. Please input <repoOwner> <repoName>");
  } else 
  getRepoContributors(repoOwner, repoName, function(err, body) {
    var contributors = JSON.parse(body);

    contributors.forEach(function(contributor) {
         downloadImageByURL( contributor.avatar_url , 'avatar/' + contributor.login + '.jpg');
    });
  });