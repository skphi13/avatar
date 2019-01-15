var fs = require('fs');
var request = require('request')

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

  module.exports = downloadImageByURL