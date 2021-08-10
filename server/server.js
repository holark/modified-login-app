const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const appConfig = require('./config/appConfig')

server.listen(appConfig.PORT, console.log(`app is running on ${appConfig.PORT}`));