"use strict";

const WebSocketServer = require('ws').Server;

module.exports = class WS {
  static getConfig() {
    return {
      html: `
        <div id="aliv-container" style="display: none;">
          <span>added by aliv</span>
          <script>
            ;(function() {
              console.log('aliv and kicking')

              var ws = new WebSocket('ws://'+location.host);
              ws.onmessage = function(ev) {
                if (ev.data === 'reload') {
                  location.replace('');
                }
              }
            }());
          </script>
        </div>
      `,
      idContainer: '#aliv-container'
    }
  }

  constructor(httpServer) {
    this.socket = {};
    this.server = new WebSocketServer({server: httpServer});
  }

  isSocketConnected() {
    return this.socket.readyState === this.socket.OPEN;
  }

  sendReload() {
    if (this.isSocketConnected()) {
      this.socket.send('reload');
    }
  }
}