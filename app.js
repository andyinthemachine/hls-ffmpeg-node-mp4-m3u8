
require("dotenv").config();
var fs = require("fs");
var Ffmpeg = require('fluent-ffmpeg');
 
Ffmpeg.getAvailableFormats(function(err, formats) {
    if (err) return console.log(err);

  console.log('Available formats:');
  console.dir(formats);
});


new_line = () => console.log("\n");

new_line();
fs.readFile("input_mp4.txt", "utf8", function (error, data) {
    if (error) return console.log(error);
    console.log(`file is "${data}"`);
    new_line();
});




















