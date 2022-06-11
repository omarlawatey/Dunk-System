const CustomStatus = client => {
  const arrOfStatus = [
    {
      name: 'New Functions 😄',
      type: 'WATCHING'
    },
    {
      name: `Minecraft Server Addres: mc.dunk-master.com`,
      type: 'PLAYING'
    }
  ];

  let i = 0;
  setInterval(() => {
    if (i === arrOfStatus.length) i = 0;
    const status = arrOfStatus[i];
    client.user.setActivity(status.name, { type: status.type });
    i++;
  }, 5000);
};

export default CustomStatus;
