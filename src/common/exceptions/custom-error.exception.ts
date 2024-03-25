import { HttpStatus } from '@nestjs/common'

export abstract class CustomErrorException extends Error {
	desiredStatus?: HttpStatus

	/**
	 *
	 * @param message
	 * @param [desiredStatus] {HttpStatus} - Represents the desired HTTP status code for any HTTP responses.
	 * This is optional because the layer throwing the error may not always be aware of the correct status code to use,
	 * in which case the decision be deferred to later stages of error handling.
	 */
	protected constructor(message: string, desiredStatus?: HttpStatus) {
		super(message)
		Object.setPrototypeOf(this, new.target.prototype)

		/*
		 *	In JavaScript, when you extend the built-in Error class and create your custom error type, the error instance's name property defaults to 'Error', which is the name of the nearest constructor function in the prototype chain, Error in this case.
		 * Setting this.name inside your custom error's constructor to this.constructor.name ensures that the name property of instances of your custom error correctly reflect the name of the custom error class.
		 * This can be helpful when you want to do error handling based on error type.
		 */
		this.name = this.constructor.name
		if (desiredStatus) this.desiredStatus = desiredStatus
	}
}
