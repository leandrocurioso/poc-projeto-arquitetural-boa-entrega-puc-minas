const app = require('../app');
const http = require('http');
const dotenv = require('dotenv');
const getenv = require('getenv');
const Config = require('../infrastructure/config');
const path = require('path');

class WWW {
  static startServer() {
    const envFilepath = path.join(__dirname, '../', '.env');
    const config = new Config({ dotenv, getenv }).get(envFilepath);
    
    /**
     * Get port from environment and store in Express.
     */
    
    var port = normalizePort(config.general.port || '3000');
    app.set('port', port);
    
    /**
     * Create HTTP server.
     */
    
    var server = http.createServer(app);
    
    /**
     * Listen on provided port, on all network interfaces.
     */
    
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
    
    /**
     * Normalize a port into a number, string, or false.
     */
    
    function normalizePort(val) {
      var port = parseInt(val, 10);
    
      if (isNaN(port)) {
        // named pipe
        return val;
      }
    
      if (port >= 0) {
        // port number
        return port;
      }
    
      return false;
    }
    
    /**
     * Event listener for HTTP server "error" event.
     */
    
    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }
    
      var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    
      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    }
    
    /**
     * Event listener for HTTP server "listening" event.
     */
    
    function onListening() {
      const addr = server.address();
      const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
      console.log(`[${config.general.appName}] - Start listening on ${bind}`);
    }    
  }
}

try {
  WWW.startServer();
} catch (err) {
  console.error(err);
}
