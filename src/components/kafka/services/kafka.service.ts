import { injectable } from 'inversify';
import { Consumer, Kafka, Producer } from 'kafkajs';

import logger from '../../../utils/logger';
import { IKafkaService } from './kafka.interface.service';
import dotenv from 'dotenv';

dotenv.config();
const kafkaUrls = process.env.KAFKA_URL ? process.env.KAFKA_URL.split(',') : [];
@injectable()
export class KafkaService implements IKafkaService {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'book-service',
      brokers: kafkaUrls,
    });

    this.producer = this.kafka.producer();
  }

  async connect(): Promise<void> {
    await this.producer.connect();
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }

  async productMessage(topic: string, message: Object): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      logger.error('Send message error: ' + error);
    }
  }
}

export default KafkaService;
