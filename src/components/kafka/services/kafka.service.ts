import { injectable } from 'inversify';
import { Consumer, Kafka, Producer } from 'kafkajs';

import logger from '../../../utils/logger';
import { IKafkaService } from './kafka.interface.service';

require('dotenv').config();

@injectable()
export class KafkaService implements IKafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'book-service',
      brokers: ['localhost:9092', 'localhost:9093'],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'kafka-consumer-group' });
  }

  async connect(): Promise<void> {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
    await this.consumer.disconnect();
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

  async consumeMessage(topic: string): Promise<void> {
    try {
      await this.consumer.subscribe({ topic, fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ message }) => {
          logger.debug('Consume message: ' + message);
        },
      });
    } catch (error) {
      logger.error('Consume message error: ' + error);
    }
  }
}

export default KafkaService;
