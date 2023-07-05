import { Container } from 'inversify';
import TYPES from '../constants/type';
import { BookService, IBookService } from '../components/book';
import { CategoryService, ICategoryService } from '../components/category';
import { CartService, ICartService } from '../components/cart';
import { IKafkaService } from '../components/kafka/services/kafka.interface.service';
import KafkaService from '../components/kafka/services/kafka.service';
import { ISchemaRegistryService } from '../components/schema-registry/services/schema-registry.interface.service';
import SchemaRegistryService from '../components/schema-registry/services/schema-registry.service';

const DiContainer = new Container();

DiContainer.bind<IBookService>(TYPES.IBookService)
  .to(BookService)
  .inRequestScope();
DiContainer.bind<ICategoryService>(TYPES.ICategoryService)
  .to(CategoryService)
  .inRequestScope();
DiContainer.bind<ICartService>(TYPES.ICartService)
  .to(CartService)
  .inRequestScope();
DiContainer.bind<IKafkaService>(TYPES.IKafkaService)
  .to(KafkaService)
  .inRequestScope();
DiContainer.bind<ISchemaRegistryService>(TYPES.ISchemaRegistryService)
  .to(SchemaRegistryService)
  .inRequestScope();

export default DiContainer;
