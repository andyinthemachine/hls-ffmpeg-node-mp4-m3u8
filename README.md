






### **hls-ffmpeg-node-mp4-m3u8 app**

#### Author: Andrew Ulrich 

#### Script is node.js 

### Transcodes input video (.mp4) to HLS multi-bitrate assets and master manifest 

#### Links: Node libraries fluent-ffmpeg, fluent-ffprobe, fs, path, dotenv

##### Segments for each bitrate are bundled into a single .ts file

##### Bit rates: 6000k/1920x1080  4500k/1280x720  3000k/1280/720  2000k/906x540  1100k/768x432

#### CLI:  node mp4-hls <inputfile>  eg: node mp4-hls tos-teaser.mp4

##### Looks for input video in current app directory

##### Creates sub-directory underneath current with base name of video for created files

##### Files created: .ts and .m3u8 for each bitrate, and master.m3u8



