const AutoResponder = ({ autoResponse }, message) => {
  autoResponse.forEach(async item => {
    {
      if (message.content.toLowerCase() === item.command)
        if (item.hasOwnProperty('responseFunction')) {
          await item.responseFunction(message);
          return;
        } else
          message.reply({
            content: item.response
          });
    }
  });
};

export default AutoResponder;
