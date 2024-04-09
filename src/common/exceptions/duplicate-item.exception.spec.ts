import { DuplicateItemException } from './duplicate-item.exception'

describe('DuplicateItemException', () => {
	describe('when multiple fields are duplicate', () => {
		it('should correctly format the error message', () => {
			const exception = new DuplicateItemException('TestEntity', ['field1', 'field2', 'field3'])
			expect(exception.message).toBe('A duplicate instance of TestEntity has been found. The duplicate fields are: field1, field2, and field3')
		})
	})
	describe('when single field is duplicate', () => {
		it('should correctly format the error message', () => {
			const exception = new DuplicateItemException('TestEntity', ['testField'])
			expect(exception.message).toBe('A duplicate instance of TestEntity has been found. The duplicate field is: testField')
		})
	})
})
