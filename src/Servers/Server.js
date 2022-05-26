import express from 'express';
import http from 'http';

const Server = () => {
  const app = express();
  var server = http.createServer(app);

  app.get('/', (request, response) => {
    console.log(`Ping Received.`);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('DISCORD BOT YO');
  });

  const listener = server.listen(process.env.YT_SERVER_PORT, function () {
    console.log(`Your app is listening on port ` + listener.address().port);
  });
};

export default Server;
