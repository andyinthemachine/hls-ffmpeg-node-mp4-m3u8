






### Application: hls-ffmpeg-node-mp4-m3u8 

#### Author: Andrew Ulrich 

#### Script: Node.js 

### Transcodes input video (.mp4) to HLS multi-bitrate assets and master manifest 

#### Links: Node libraries fluent-ffmpeg, fs, path, dotenv

##### Segments for each bitrate are bundled into a single .ts file using byte ranges

#####  Provide segment length (1-30 sec) in second command line parameter.

#####  (Script ensures no segment less than provided segment length)

##### Bit rates: 6000k/1920x1080  4500k/1280x720  3000k/1280/720  2000k/906x540  1100k/768x432

#### CLI:  node mp4-hls (filename.mp4) (segment length 1-30 seconds)   eg: node mp4-hls tos-teaser.mp4 6

##### Looks for input video in current app directory

##### Creates sub-directory underneath current with base name of video for created files

##### Files created: .ts and .m3u8 for each bitrate, and master.m3u8



