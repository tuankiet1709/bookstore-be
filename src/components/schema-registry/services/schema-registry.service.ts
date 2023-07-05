import { injectable } from 'inversify';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';

import logger from '../../../utils/logger';
import { ISchemaRegistryService } from './schema-registry.interface.service';

require('dotenv').config();

const registry = new SchemaRegistry({
  host: 'http://localhost:8081',
});

@injectable()
export class SchemaRegistryService implements ISchemaRegistryService {
  constructor() {}

  async getSchemaRegistryId(data: any): Promise<number | undefined> {
    try {
      const { id } = await registry.register(data);
      return id;
    } catch (err) {
      logger.error(err);
    }
  }
}

export default SchemaRegistryService;
