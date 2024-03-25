import { CustomErrorException } from './custom-error.exception'
import { HttpStatus } from '@nestjs/common'

export class NoContentException extends CustomErrorException {
	/**
	 *
	 * @param entityName - The name of the entity that was not found.
	 */
	constructor(entityName: string) {
		super(`No ${entityName} was found with the given condition`, HttpStatus.NO_CONTENT)
	}
}
