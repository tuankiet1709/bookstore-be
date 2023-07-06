export interface IKafkaService {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  productMessage(topic: string, message: Object): Promise<void>;
}
