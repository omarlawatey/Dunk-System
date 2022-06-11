const AutoResponder = ({ autoResponse }, message) => {
  autoResponse.forEach(item => {
    if (message.content.toLowerCase() === item.command)
      message.reply({
        content: item.response
      });
  });
};

export default AutoResponder;
