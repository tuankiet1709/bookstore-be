import { inject, injectable } from 'inversify';
import { IUserService } from '../services/user.service.interface';
import TYPES from '../../../constants/type';
import express from 'express';

@injectable()
export class UserController {
	private userService: IUserService;

	constructor(@inject(TYPES.IUserService) userService: IUserService) {
		this.userService = userService;
	}

	public async login(req: express.Request, res: express.Rssponse) {}
}
