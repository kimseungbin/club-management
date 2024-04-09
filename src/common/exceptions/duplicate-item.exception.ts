import { CustomErrorException } from './custom-error.exception'

export class DuplicateItemException extends CustomErrorException {
	constructor(entityName: string, duplicateFields: string[]) {
		const fieldsLength = duplicateFields.length
		const lastProperty = duplicateFields.pop()
		const fields = fieldsLength > 1 ? `${duplicateFields.join(', ')}, and ${lastProperty}` : `${lastProperty}`
		const fieldLabel = fieldsLength > 1 ? 'fields are' : 'field is'

		super(`A duplicate instance of ${entityName} has been found. The duplicate ${fieldLabel}: ${fields}`)
	}
}
