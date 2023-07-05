export interface ISchemaRegistryService {
  getSchemaRegistryId(data: any): Promise<number | undefined>;
}
