import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('health')
export class HealthController {
	@Get()
	check(@Res() res: Response): void {
		res.status(HttpStatus.OK).send('OK!')
	}
}
