
// mp4-hls transcoder node script

require('dotenv').config();
var fs = require('fs');
var path = require('path');
var ffmpeg = require('fluent-ffmpeg');

const input_file = process.argv[2];
const segment_len = process.argv[3];
const base_video_name = path.basename(input_file, '.mp4');


new_line = () => console.log("\n");


if ((input_file) && ((parseInt(segment_len) > 0) && (parseInt(segment_len) <= 30))) {

  ffmpeg.ffprobe(input_file, function (err, metadata) {
    if (err) return console.log(err);

    // set initial segment length as ((dur % seg_len) + seg_len) to prevent segments less than segment_len
    let video_duration = Math.trunc(metadata.streams[0].duration)
    let init_segment_len = ((video_duration % parseInt(segment_len)) + parseInt(segment_len)).toString();

  // create sub-directory for assets
  try {
    if (!fs.existsSync(base_video_name)) {
      fs.mkdirSync(base_video_name)
    }
  } catch (err) {
    console.error(err);
    return (false);
  }

  ffmpeg(input_file)
    // bitrate res_w res_h  maxrate bufsize
    // (6000, 1920, 1080, 6420, 9000);
    .output(`${base_video_name}/hls-${base_video_name}-1080p-6000br.m3u8`)
    .outputOptions(
      '-vf', 'scale=1920:h=1080:force_original_aspect_ratio=decrease',
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
      '-hls_init_time', init_segment_len,
      '-hls_time', segment_len,
      '-hls_flags', 'single_file',
      '-hls_playlist_type', 'vod'
    )
    // bitrate res_w res_h  maxrate bufsize
    // (4500, 1728, 720, 4814, 6750);
    .output(`${base_video_name}/hls-${base_video_name}-720p-4500br.m3u8`)
    .outputOptions(
      '-vf', 'scale=1728:h=720',
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
      '-hls_init_time', init_segment_len,
      '-hls_time', segment_len,
      '-hls_flags', 'single_file',
      '-hls_playlist_type', 'vod'
    )
    // bitrate res_w res_h  maxrate bufsize
    // (3000, 1728, 720, 3210, 4500);
    .output(`${base_video_name}/hls-${base_video_name}-720p-3000br.m3u8`)
    .outputOptions(
      '-vf', 'scale=w=1728:h=720',
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
      '-hls_init_time', init_segment_len,
      '-hls_time', segment_len,
      '-hls_flags', 'single_file',
      '-hls_playlist_type', 'vod'
    )
    // bitrate res_w res_h  maxrate bufsize
    // (2000, 1296, 540, 2140, 3000);
    .output(`${base_video_name}/hls-${base_video_name}-540p-2000br.m3u8`)
    .outputOptions(
      '-vf', 'scale=w=1296:h=540',
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
      '-hls_init_time', init_segment_len,
      '-hls_time', segment_len,
      '-hls_flags', 'single_file',
      '-hls_playlist_type', 'vod'
    )
    // bitrate res_w res_h  maxrate bufsize
    // (1100, 1032, 430, 1176, 1650);
    .output(`${base_video_name}/hls-${base_video_name}-430p-1100br.m3u8`)
    .outputOptions(
      '-vf', 'scale=w=1032:h=430',
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
      '-hls_init_time', init_segment_len,
      '-hls_time', segment_len,
      '-hls_flags', 'single_file',
      '-hls_playlist_type', 'vod'
    )

    .on('start', function (commandLine) {
      console.log('Spawned ffmpeg with command: ' + commandLine);
    })
    .on('error', function (err) {
      console.log('An error occurred: ' + err.message);
      return (false);
    })
    .on('end', function () {

      console.log('Processing finished');

      let master_playlist_str = '#EXTM3U\n#EXT-X-VERSION:4\n';

      master_playlist_str += '#EXT-X-STREAM-INF:AVERAGE-BANDWIDTH=1100000,BANDWIDTH=1176000,FRAME-RATE=24,CODECS="avc1.640028",RESOLUTION=1032x430\n';
      master_playlist_str += `hls-${base_video_name}-432p-1100br.m3u8\n`

      master_playlist_str += '#EXT-X-STREAM-INF:AVERAGE-BANDWIDTH=2000000,BANDWIDTH=2140000,FRAME-RATE=24,CODECS="avc1.640028",RESOLUTION=1296x540\n';
      master_playlist_str += `hls-${base_video_name}-540p-2000br.m3u8\n`

      master_playlist_str += '#EXT-X-STREAM-INF:AVERAGE-BANDWIDTH=3000000,BANDWIDTH=3210000,FRAME-RATE=24,CODECS="avc1.640028",RESOLUTION=1728x720\n';
      master_playlist_str += `hls-${base_video_name}-720p-3000br.m3u8\n`

      master_playlist_str += '#EXT-X-STREAM-INF:AVERAGE-BANDWIDTH=4500000,BANDWIDTH=4814000,FRAME-RATE=24,CODECS="avc1.640028",RESOLUTION=1728x720\n';
      master_playlist_str += `hls-${base_video_name}-720p-4500br.m3u8\n`

      master_playlist_str += '#EXT-X-STREAM-INF:AVERAGE-BANDWIDTH=6000000,BANDWIDTH=6420000,FRAME-RATE=24,CODECS="avc1.640028",RESOLUTION=1920x1080\n';
      master_playlist_str += `hls-${base_video_name}-1080p-6000br.m3u8\n`

      fs.writeFile(`${base_video_name}/${base_video_name}-master.m3u8`, master_playlist_str, function (err) {
        if (err) throw err;
        console.log('Master file created');
        new_line();
      });
      return (true);
    })
    .run();  
  });
}
else {
  console.log("Please specify input file and and segment length (1-30 sec)");
  console.log("eg: node mp4-hls tos-teaser 6 <ret>");
}

new_line();
















