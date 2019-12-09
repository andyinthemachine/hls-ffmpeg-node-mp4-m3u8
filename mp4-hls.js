
require('dotenv').config();
var fs = require('fs');
var path = require('path');
var ffmpeg = require('fluent-ffmpeg');
var ffprobe = require('fluent-ffmpeg');

const input_file = process.argv[2];
const base_video_name = path.basename(input_file, '.mp4');

new_line = () => console.log("\n");


// create sub-directory for assets

if (input_file) {
  try {
    if (!fs.existsSync(base_video_name)) {
      fs.mkdirSync(base_video_name)
    }
  } catch (err) {
    console.error(err)
  }

  // bitrate res_w res_h  maxrate bufsize
  // (6000, 1920, 1080, 6420, 9000);
  // (4500, 1280, 720, 4814, 6750);
  // (3000, 1280, 720, 3210, 4500);
  // (2000, 960, 540, 2140, 3000);
  // (1100, 768, 432, 1176, 1650);

  ffmpeg(input_file)
    // bitrate res_w res_h  maxrate bufsize
    // (6000, 1920, 1080, 6420, 9000);
    .output(`${base_video_name}/hls-${base_video_name}-1080p-6000br.m3u8`)
    .outputOptions(
      '-vf', 'scale=w=1920:h=1080',
      '-c:a', 'aac',
      '-ar', '48000',
      '-b:a', '128k',
      '-c:v', 'h264',
      '-profile:v', 'main',
      '-crf', '20',
      '-g', '48',
      '-keyint_min', '48',
      '-sc_threshold', '0',
      '-b:v', '6000k',
      '-maxrate', '6420k',
      '-bufsize', '9000k',
      '-hls_time', '6',
      '-hls_segment_filename', `${base_video_name}/hls-${base_video_name}-1080p-6000br-%03d.ts`,
      '-hls_playlist_type', 'vod',
    )
    // bitrate res_w res_h  maxrate bufsize
    // (4500, 1280, 720, 4814, 6750);
    .output(`${base_video_name}/hls-${base_video_name}-720p-4500br.m3u8`)
    .outputOptions(
      '-vf', 'scale=w=1280:h=720',
      '-c:a', 'aac',
      '-ar', '48000',
      '-b:a', '128k',
      '-c:v', 'h264',
      '-profile:v', 'main',
      '-crf', '20',
      '-g', '48',
      '-keyint_min', '48',
      '-sc_threshold', '0',
      '-b:v', '4500k',
      '-maxrate', '4814k',
      '-bufsize', '6750k',
      '-hls_time', '6',
      '-hls_segment_filename', `${base_video_name}/hls-${base_video_name}-720p-4500br-%03d.ts`,
      '-hls_playlist_type', 'vod',
    )
    // bitrate res_w res_h  maxrate bufsize
    // (3000, 1280, 720, 3210, 4500);
    .output(`${base_video_name}/hls-${base_video_name}-720p-3000br.m3u8`)
    .outputOptions(
      '-vf', 'scale=w=1280:h=720',
      '-c:a', 'aac',
      '-ar', '48000',
      '-b:a', '128k',
      '-c:v', 'h264',
      '-profile:v', 'main',
      '-crf', '20',
      '-g', '48',
      '-keyint_min', '48',
      '-sc_threshold', '0',
      '-b:v', '3000k',
      '-maxrate', '3210k',
      '-bufsize', '4500k',
      '-hls_time', '6',
      '-hls_segment_filename', `${base_video_name}/hls-${base_video_name}-720p-3000br-%03d.ts`,
      '-hls_playlist_type', 'vod',
    )
    // bitrate res_w res_h  maxrate bufsize
    // (2000, 960, 540, 2140, 3000);
    .output(`${base_video_name}/hls-${base_video_name}-540p-2000br.m3u8`)
    .outputOptions(
      '-vf', 'scale=w=960:h=540',
      '-c:a', 'aac',
      '-ar', '48000',
      '-b:a', '128k',
      '-c:v', 'h264',
      '-profile:v', 'main',
      '-crf', '20',
      '-g', '48',
      '-keyint_min', '48',
      '-sc_threshold', '0',
      '-b:v', '2000k',
      '-maxrate', '2140k',
      '-bufsize', '3000k',
      '-hls_time', '6',
      '-hls_segment_filename', `${base_video_name}/hls-${base_video_name}-540p-2000br-%03d.ts`,
      '-hls_playlist_type', 'vod',
    )
    // bitrate res_w res_h  maxrate bufsize
    // (1100, 768, 432, 1176, 1650);
    .output(`${base_video_name}/hls-${base_video_name}-432p-1100br.m3u8`)
    .outputOptions(
      '-vf', 'scale=w=768:h=432',
      '-c:a', 'aac',
      '-ar', '48000',
      '-b:a', '128k',
      '-c:v', 'h264',
      '-profile:v', 'main',
      '-crf', '20',
      '-g', '48',
      '-keyint_min', '48',
      '-sc_threshold', '0',
      '-b:v', '1100k',
      '-maxrate', '1176k',
      '-bufsize', '1650k',
      '-hls_time', '6',
      '-hls_segment_filename', `${base_video_name}/hls-${base_video_name}-432p-1100br-%03d.ts`,
      '-hls_playlist_type', 'vod',
    )
    .on('start', function (commandLine) {
      console.log('Spawned ffmpeg with command: ' + commandLine);
    })
    .on('error', function (err) {
      console.log('An error occurred: ' + err.message);
      return (false);
    })
    .on('end', function () {
      console.log('Processing finished !');
      return (true);
    })
    .run();
}

else
  console.log("no file specified");

new_line();


// const create_bitrate_asset = (bit_rate, res_width, res_height, max_rate, buf_size) => {
//   console.log(`Creating segments and stream level manifest for ${base_video_name} bitrate - ${bit_rate}k ${res_height}x${res_width}`)
//   ffmpeg(input_file)
//     .output(`${base_video_name}/hls-${base_video_name}-${res_height}p-${bit_rate}br.m3u8`)
//     .outputOptions(
//       '-vf', `scale=w=${res_width}:h=${res_height}:force_original_aspect_ratio=decrease`,
//       '-c:a', 'aac',
//       '-ar', '48000',
//       '-b:a', '128k',
//       '-c:v', 'h264',
//       '-profile:v', 'main',
//       '-crf', '20',
//       '-g', '48',
//       '-keyint_min', '48',
//       '-sc_threshold', '0',
//       '-b:v', `${bit_rate}k`,
//       '-maxrate', `${max_rate}k`,
//       '-bufsize', `${buf_size}k`,
//       '-hls_time', '6',
//       '-hls_segment_filename', `${base_video_name}/hls-${base_video_name}-${res_height}p-${bit_rate}br-%03d.ts`,
//       '-hls_playlist_type', 'vod',
//     )
//     .on('start', function (commandLine) {
//       console.log('Spawned ffmpeg with command: ' + commandLine);
//     })
//     .on('error', function (err) {
//       console.log('An error occurred: ' + err.message);
//       return (false);
//     })
//     .on('end', function () {
//       console.log('Processing finished !');
//       return (true);
//     })
//     .run();
// }



// if (input_file) {
//   try {
//     if (!fs.existsSync(base_video_name)) {
//       fs.mkdirSync(base_video_name)
//     }
//   } catch (err) {
//     console.error(err)
//   }

//   let created = create_bitrate_asset(6000, 1920, 1080, 6420, 9000);
//   if (created) created = create_bitrate_asset(4500, 1280, 720, 4814, 6750);
//   if (created) created = create_bitrate_asset(3000, 1280, 720, 3210, 4500);
//   if (created) created = create_bitrate_asset(2000, 960, 540, 2140, 3000);
//   if (created) created = create_bitrate_asset(1100, 768, 432, 1176, 1650);
// }
// else
//   console.log("no file specified");




// ffmpeg.ffprobe(input_file, function (err, metadata) {
//   if (err) return console.log(err);
//   console.dir(metadata);
// });

  // ffmpeg(input_file)
  // .outputOptions(
  //   '-hls_time', '6',
  //   '-hls_segment_filename', 'fileSequenced%d.ts',
  //   '-hls_playlist_type', 'vod',
  // )
  // .output("prog_index.m3u8")
  // .on('start', function (commandLine) {
  //   console.log('Spawned ffmpeg with command: ' + commandLine);
  // })
  // .on('error', function (err) {
  //   console.log('An error occurred: ' + err.message);
  // })
  // .on('end', function () {
  //   console.log('Processing finished !');
  // })
  // .run();

// ffmpeg(input_file)
//   .outputOptions(
//     '-vf', 'scale=w=200:h=320:force_original_aspect_ratio=decrease'
//   )
//   .output("temp.mp4")
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


// -vf scale=w=1920:h=1080:force_original_aspect_ratio=decrease
// -c:a aac
// -ar 48000
// -b:a 128k
// -c:v h264 
// -profile:v main 
// -crf 20 -g 48 
// -keyint_min 48 
// -sc_threshold 0 
// -b:v 6000k 
// -maxrate 7800k 
// -bufsize 3750k 
// -hls_time 6 
// -hls_playlist_type vod 
// -hls_segment_filename hls-tos-teaser-1080p-%03d.ts 
//  hls-tos-teaser-prog-1080p.m3u8















