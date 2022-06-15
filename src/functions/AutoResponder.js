const AutoResponder = ({ autoResponse }, message) => {
  autoResponse.forEach(item => {
    {
      if (message.content.toLowerCase() === item.command)
        if (item.hasOwnProperty('responseFunction')) {
          item.responseFunction(message);
          return;
        }

      message.reply({
        content: item.response
      });
    }
  });
};

export default AutoResponder;
