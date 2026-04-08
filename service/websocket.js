// WebSocket server for broadcasting new replies
const WebSocket = require('ws');

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };
  return wss;
}

module.exports = setupWebSocketServer;
