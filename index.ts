import * as http from 'http';
import 'reflect-metadata';
import db from './src/utils/db';
import App from './src/app';
import logger from './src/utils/logger';

const port = 3080;

App.set('port', port);
const server = http.createServer(App);

db.open();

server.listen(port, () => {
  logger.info('Server is listening on port', port);
});
