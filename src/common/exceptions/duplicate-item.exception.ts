import { CustomErrorException } from './custom-error.exception'

export class DuplicateItemException extends CustomErrorException {
	constructor(entityName: string, duplicateField: string, value: any) {
		super(`A duplicate instance of ${entityName} has been found. The duplicate field is ${duplicateField} with value ${value}.`)
	}
}
