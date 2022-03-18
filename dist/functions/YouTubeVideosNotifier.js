"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _youtubeNotification = _interopRequireDefault(require("youtube-notification"));

var _static = _interopRequireDefault(require("../assets/static"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const YouTubeVideosNotifier = async client => {
  const {
    serverId,
    YouTubeApi: {
      channelId,
      newVideoNotifiactionChannelId
    }
  } = _static.default;
  const ytnotificationChannel = await client.guilds.cache.get(serverId).channels.cache.get(newVideoNotifiactionChannelId);
  console.log('2'); // const app = express();
  // const notifier = new YouTubeNotifier({
  //   hubCallback: 'http://localhost/yt',
  //   port: 58218,
  //   path: '/yt'
  // });
  // notifier.setup();
  // console.log('3');
  // //   notifier.on('notified', async data => {
  // //     console.log(
  // //       `${data.channel.name} just uploaded a new video titled: ${data.video.title}`
  // //     );
  // //     await ytnotificationChannel.send({
  // //       content: `${data.channel.name} uploaded a new Video.Go check it now!
  // // ${data.video.title}
  // // ${data.video.link}`
  // //     });
  // //   });
  // notifier.on('notified', data => {
  //   console.log('New Video');
  //   // client.channels.cache
  //   //   .get(SERVER_CHANNEL_ID)
  //   //   .send(
  //   //     `**${data.channel.name}** just uploaded a new video - **${data.video.link}**`
  //   //   );
  // });
  // notifier.subscribe(channelId);
  // app.use('/yt', notifier.listener());
};

var _default = YouTubeVideosNotifier;
exports.default = _default;