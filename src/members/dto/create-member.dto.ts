import { Matches } from 'class-validator'

export class CreateMemberDto {
	// todo refactor phone number pattern as global variable
	@Matches(/^010(\d{7,8})$/, {
		message: 'Phone number must start with 010 and can have either 7 or 8 numeric characters after that.',
	})
	phone: string
}
