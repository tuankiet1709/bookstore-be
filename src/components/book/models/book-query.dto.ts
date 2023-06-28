import BaseQueryCriteria from '../../../interfaces/BaseQueryCriteria';

export default interface BookQueryCriteria extends BaseQueryCriteria {
	_id: string;
	categoryID: string;
}
