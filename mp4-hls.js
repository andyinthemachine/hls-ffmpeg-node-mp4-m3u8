
// mp4-hls transcoder node script

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
      '-hls_flags', 'single_file',
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
      '-hls_flags', 'single_file',
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
      '-hls_flags', 'single_file',
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
      '-hls_flags', 'single_file',
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
      '-hls_flags', 'single_file',
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

ffmpeg.ffprobe(input_file, function (err, metadata) {
  if (err) return console.log(err);
  // console.dir(metadata);
});

let master_playlist_str = '#EXTM3U\n#EXT-X-VERSION:4\n';

master_playlist_str += '#EXT-X-STREAM-INF:PROGRAM-ID=1:BANDWIDTH=1100000,RESOLUTION=768x432\n';
master_playlist_str += `hls-${base_video_name}-432p-1100br.m3u8\n`

master_playlist_str += '#EXT-X-STREAM-INF:PROGRAM-ID=1BANDWIDTH=2000000,RESOLUTION=960x540\n';
master_playlist_str += `hls-${base_video_name}-540p-2000br.m3u8\n`

master_playlist_str += '#EXT-X-STREAM-INF:PROGRAM-ID=1BANDWIDTH=3000000,RESOLUTION=1280x720\n';
master_playlist_str += `hls-${base_video_name}-720p-3000br.m3u8\n`

master_playlist_str += '#EXT-X-STREAM-INF:PROGRAM-ID=1BANDWIDTH=4500000,RESOLUTION=1280x720\n';
master_playlist_str += `hls-${base_video_name}-720p-4500br.m3u8\n`

master_playlist_str += '#EXT-X-STREAM-INF:PROGRAM-ID=1BANDWIDTH=6000000,RESOLUTION=1920x1080\n';
master_playlist_str += `hls-${base_video_name}-1080p-6000br.m3u8\n`

fs.writeFile(`${base_video_name}/${base_video_name}-master.m3u8`, master_playlist_str, function (err) {
  if (err) throw err;
  console.log('Master file created');
  new_line();
});



















