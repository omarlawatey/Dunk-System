"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Server = () => {
  const app = (0, _express.default)();

  var server = _http.default.createServer(app);

  app.get('/', (request, response) => {
    console.log(`Ping Received.`);
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    response.end('DISCORD BOT YO');
  });
  const listener = server.listen(process.env.YT_SERVER_PORT, function () {
    console.log(`Your app is listening on port ` + listener.address().port);
  });
};

var _default = Server;
exports.default = _default;