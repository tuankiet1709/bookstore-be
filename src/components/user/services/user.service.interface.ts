import {
	CreateUserResponse,
	LoginUserResponse,
} from '../../../constants/response';

export interface IUserService {
	createAuthToken(userId: string): Promise<{ token: string; expireAt: Date }>;
	login(login: string, password: string): Promise<LoginUserResponse>;
}
