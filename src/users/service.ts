import {User, UserCreationParams, UserLoginParams} from './models';
import {provideSingleton} from '../util/provideSingleton';
import {sign} from 'jsonwebtoken';
import {secret} from '../auth/authentication';
import {UsersRepo} from './repo';
import {inject} from 'inversify';

interface ValidationPayload {
	username: string;
	email: string;
}

@provideSingleton(UsersService)
export class UsersService {
	private repo: UsersRepo;

	constructor(@inject(UsersRepo) userRepo: UsersRepo) {
		this.repo = userRepo;
	}

	public get(id: number): User | null {
		const user = this.repo.getById(id);
		if (!user) {
			return null;
		}
		return user;
	}

	public create(userCreationParams: UserCreationParams): number {
		const res = this.repo.createOne(userCreationParams);
		if (res instanceof Error) {
			console.log(res.message);
			return -1;
		}
		return res;
	}

	public login(requestBody: UserLoginParams): string | null {
		const {username, email} = requestBody;
		if (this.exist({username, email})) {
			return sign({username, email}, secret);
		}
		return null;
	}

	public exist(payload: ValidationPayload): boolean {
		return this.repo.exist(payload);
	}
}
