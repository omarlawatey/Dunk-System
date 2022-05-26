import { MessageAttachment } from 'discord.js';
import { GuildData, privateMessageServerData, UserData, welcomeImage } from '../assets/subFunctions';
import { UserSchema } from '../DataBase';

const Welcome = async (serverInfo, welcomeChannel, member) => {
  let data = await welcomeImage(
    member,
    'https://github.com/omarlawatey/Dunk-System/blob/main/Images/WelcomeImage.png?raw=true'
  );

  if (
    (await UserData(member.guild, member, {
      type: 'getData',
      getDataFilter: {
        memberId: member.id
      }
    })) === null
  ) {
    await UserData(member.guild, member, {
      type: 'create',
      warnsAmount: 0
    });
  }

  const oldUser = await GuildData(member.guild, {
    type: 'lastJoinedMembers',
    LastJoinedMemberId: member.id
  }).then(req => (req.lastJoinedMembers.includes(member.id) ? 'found' : 'notFound'));

  const attachment = new MessageAttachment(data, 'welcome-image.png');

  if (oldUser === 'notFound') {
    await welcomeChannel
      .send({
        files: [attachment]
      })
      .then(msg => {
        msg.channel.send({
          content: `> **Welcome** ${member}
          > **Make Sure Read:** <#${serverInfo.rulesChannelId}>
          > **Total Member:** **${member.guild.memberCount}**
          > **& Have a Nice Time With US**`
        });
      })
      .then(async msg => {
        UserSchema(member.guild, member, { type: 'create' });

        try {
          await privateMessageServerData(serverInfo, member.user);
        } catch (err) {
          console.log(err);
        }
      });
  }

  serverInfo.welcome.autoRole.forEach(item => {
    member.roles.add(item);
  });
};

export default Welcome;
