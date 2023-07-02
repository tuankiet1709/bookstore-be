/* istanbul ignore file */

import mongoose from 'mongoose';

import logger from '../utils/logger';

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.set('debug', process.env.DEBUG !== undefined);

class MongoConnection {
  private static _instance: MongoConnection;

  // private _mongoServer?: MongoMemoryServer

  static getInstance(): MongoConnection {
    if (!MongoConnection._instance) {
      MongoConnection._instance = new MongoConnection();
    }
    return MongoConnection._instance;
  }

  public async open(): Promise<void> {
    logger.info(process.env.MONGO_URL);
    try {
      logger.debug('connecting to mongo db: ' + process.env.MONGO_URL);
      await mongoose.connect(process.env.MONGO_URL as string);

      mongoose.connection.on('connected', () => {
        logger.info('Mongo: connected');
      });

      mongoose.connection.on('disconnected', () => {
        logger.error('Mongo: disconnected');
      });

      mongoose.connection.on('error', (err) => {
        logger.error(`Mongo:  ${String(err)}`);
        if (err.name === 'MongoNetworkError') {
          setTimeout(function () {
            mongoose.connect(process.env.MONGO_URL as string).catch(() => {});
          }, 5000);
        }
      });
    } catch (err) {
      logger.error(`db.open: ${err}`);
      throw err;
    }
  }

  public async close(): Promise<void> {
    try {
      await mongoose.disconnect();
    } catch (err) {
      logger.error(`db.open: ${err}`);
      throw err;
    }
  }
}

export default MongoConnection.getInstance();
