






### Application: hls-ffmpeg-node-mp4-m3u8 

#### Author: Andrew Ulrich 

#### Script: Node.js 

### Transcodes input video (.mp4) to HLS multi-bitrate assets and master manifest 

#### Links: Node libraries fluent-ffmpeg, fs, path, dotenv

##### Segments for each bitrate are bundled into a single .ts file using byte ranges

#####  Extracts audio to separate track in HLD manifest.

#####  Provide segment length (2-30 sec) in second command line parameter.

#####  (Script ensures no segment less than provided segment length)

##### Bitrates: 6000k/1080p  4500k/720p  3000k/720p  2000k/540p  1100k/430p

#### CLI:  node mp4-hls (filename.mp4) (segment length 1-30 seconds)   eg: node mp4-hls tos-teaser.mp4 6

##### Looks for input video in script root directory

##### Creates sub-directory underneath script root with base name of video for created files

##### Files created: .ts and .m3u8 for each bitrate, and master.m3u8



