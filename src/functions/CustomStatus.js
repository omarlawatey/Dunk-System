const CustomStatus = client => {
  const arrOfStatus = [
    {
      name: `mc.dunk-master.com:25589`,
      type: 'PLAYING'
    },
    {
      name: '1.16.5 -> 1.18.2',
      type: 'PLAYING'
    }
  ];

  let i = 0;
  setInterval(() => {
    if (i === arrOfStatus.length) i = 0;
    const status = arrOfStatus[i];
    client.user.setActivity(status.name, { type: status.type });
    i++;
  }, 3000);
};

export default CustomStatus;
