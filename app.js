
require("dotenv").config();
var fs = require("fs");
var ffmpeg = require('fluent-ffmpeg');
var ffprobe = require('fluent-ffmpeg');

ffmpeg.getAvailableFormats(function (err, formats) {
  if (err) return console.log(err);

  // console.log('Available formats:');
  // console.dir(formats);
});


new_line = () => console.log("\n");

new_line();
fs.readFile("input_mp4.txt", "utf8", function (error, data) {
  if (error) return console.log(error);
  console.log(`metadata for "${data}"`);
  // console.log(`metadata for Alex_SL.mp4`);
  new_line();
  // ffmpeg.ffprobe('Alex_SL.mp4', function (err, metadata) {
    ffmpeg.ffprobe('tos-teaser.mp4', function (err, metadata) {
      if (err) return console.log(err);
    console.dir(metadata);
  });
});




















