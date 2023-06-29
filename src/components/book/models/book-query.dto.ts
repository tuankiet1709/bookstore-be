import BaseQueryCriteria from '../../../interfaces/BaseQueryCriteria';

export default interface BookQueryCriteria extends BaseQueryCriteria {
  categoryId: string;
}
