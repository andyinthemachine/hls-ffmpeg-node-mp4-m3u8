
require("dotenv").config();
var fs = require("fs");
var ffmpeg = require('fluent-ffmpeg');
var ffprobe = require('fluent-ffmpeg');

const input_file = process.argv[2];

new_line = () => console.log("\n");


ffmpeg.getAvailableFormats(function (err, formats) {
  if (err) return console.log(err);

  // console.log('Available formats:');
  // console.dir(formats);
});



new_line();

if (input_file)
  console.log("file is ", input_file)
else
  console.log("no file specified");

new_line();

ffmpeg.ffprobe(input_file, function (err, metadata) {
  if (err) return console.log(err);
  // console.dir(metadata);
});



// ffmpeg -y -i Alex_SL.mp4 -hls_time 6 -hls_segment_filename "fileSequence%d.ts" -hls_playlist_type vod prog_index.m3u8


// ffmpeg(input_file)
//   .outputOptions(
//     '-hls_time', '6',
//     '-hls_segment_filename', 'fileSequenced%d.ts',
//     '-hls_playlist_type', 'vod',
//   )
//   .output("prog_index.m3u8")
//   .on('start', function (commandLine) {
//     console.log('Spawned ffmpeg with command: ' + commandLine);
//   })
//   .on('error', function (err) {
//     console.log('An error occurred: ' + err.message);
//   })
//   .on('end', function () {
//     console.log('Processing finished !');
//   })
//   .run();

ffmpeg(input_file)
  .outputOptions(
    '-vf', 'scale=w=200:h=320:force_original_aspect_ratio=decrease'
  )
  .output("temp.mp4")
  .on('start', function (commandLine) {
    console.log('Spawned ffmpeg with command: ' + commandLine);
  })
  .on('error', function (err) {
    console.log('An error occurred: ' + err.message);
  })
  .on('end', function () {
    console.log('Processing finished !');
  })
  .run();


// fs.readFile("input_mp4.txt", "utf8", function (error, data) {
//   if (error) return console.log(error);
//   console.log(`metadata for "${data}"`);
//   // console.log(`metadata for Alex_SL.mp4`);
//   new_line();
//   // ffmpeg.ffprobe('Alex_SL.mp4', function (err, metadata) {
//   ffmpeg.ffprobe('tos-teaser.mp4', function (err, metadata) {
//     if (err) return console.log(err);
//     console.dir(metadata);
//   });
// });




















