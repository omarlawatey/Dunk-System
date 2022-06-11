import { TwictchStreamDetector } from '../../functions';

const SocialMedia = client => {
  setTimeout(() => {
    TwictchStreamDetector(client, process.env.TWITCH_CLIENT_ID, process.env.TWITCH_CLIENT_SECRET);

    // YouTubeVideosNotifier(client);
  }, 5000);
};

export default SocialMedia;
