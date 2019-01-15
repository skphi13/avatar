var request = require('request');
var secret = require('./secrets');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

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

  module.exports = getRepoContributors