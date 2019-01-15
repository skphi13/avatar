var contributors = require('./getContributors')
var image = require('./image');


var repoOwner = process.argv[2];
var repoName = process.argv[3];

  if (repoOwner === undefined || repoName === undefined) {
    console.log("Command line arguments are incorrect. Please input <repoOwner> <repoName>");
  } else 
    contributors(repoOwner, repoName, function(err, body) {
    var contributors = JSON.parse(body);

    contributors.forEach(function(contributor) {
         image( contributor.avatar_url , 'avatar/' + contributor.login + '.jpg');
    });
  });