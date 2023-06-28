import { injectable } from 'inversify';
import jwt, { SignOptions, VerifyErrors, VerifyOptions } from 'jsonwebtoken';

import logger from '../../../utils/logger';
import {
	CreateUserResponse,
	LoginUserResponse,
} from '../../../constants/response';
import User, { IUser } from '../models/user';
import { privateSecret, signOptions } from '../../../constants/key';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor() {}

	createAuthToken(
		userId: string
	): Promise<{ token: string; expireAt: Date }> {
		return new Promise(function (resolve, reject) {
			jwt.sign(
				{ userId: userId },
				privateSecret,
				signOptions,
				(err: Error | null, encoded: string | undefined) => {
					if (err === null && encoded !== undefined) {
						const expireAfter = 2 * 604800; /* 2 weeks */
						const expireAt = new Date();
						expireAt.setSeconds(
							expireAt.getSeconds() + expireAfter
						);

						resolve({ token: encoded, expireAt: expireAt });
					} else {
						reject(err);
					}
				}
			);
		});
	}

	async login(login: string, password: string): Promise<LoginUserResponse> {
		try {
			const user = await User.findOne({ email: login });
			if (!user) {
				return {
					error: {
						type: 'invalid_credentials',
						message: 'Invalid Login/Password',
					},
				};
			}

			const passwordMatch = await user.comparePassword(password);
			if (!passwordMatch) {
				return {
					error: {
						type: 'invalid_credentials',
						message: 'Invalid Login/Password',
					},
				};
			}
			const authToken = await this.createAuthToken(user._id.toString());
			return {
				userId: user._id.toString(),
				token: authToken.token,
				expireAt: authToken.expireAt,
			};
		} catch (err) {
			logger.error(`login: ${err}`);
			return Promise.reject({
				error: {
					type: 'internal_server_error',
					message: 'Internal Server Error',
				},
			});
		}
	}
}
