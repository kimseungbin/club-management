import { DuplicateItemException } from './duplicate-item.exception'

describe('DuplicateItemException', () => {
	it('should correctly format the error message when a field is duplicate', () => {
		const exception = new DuplicateItemException('TestEntity', 'field1', 'value1')
		expect(exception.message).toBe('A duplicate instance of TestEntity has been found. The duplicate field is field1 with value value1.')
	})
})
