import {User, UserCreationParams} from './models';
import {provideSingleton} from '../util/provideSingleton';

@provideSingleton(UsersRepo)
export class UsersRepo {
	private readonly db: Map<number, User>;

	constructor() {
		this.db = new Map;
	}

	/**
	 * Create a user with given info.
	 * Return error if the user info existed.
	 * @param payload
	 */
	public createOne(payload: UserCreationParams): Error | number {
		if (this.exist(payload)) {
			return Error('user already existed');
		}
		const {
			username, email, phone, password
		} = payload;
		const len = this.db.size;
		const id = len + 1;
		const user = {
			id, username, email, phone, password
		};
		this.db.set(id, user);
		return id;
	}

	/**
	 * Find the user by user ID if existed.
	 * @param id
	 */
	public getById(id: number): User | null {
		const user = this.db.get(id);
		if (!user) {
			return null;
		}
		return user;
	}

	/**
	 * Check if user data is already existed.
	 * @param payload
	 */
	public exist(payload: Partial<UserCreationParams>): boolean {
		const {
			username, email, phone
		} = payload;
		let found = false;
		this.db.forEach((user) => {
			if (user.email == email || user.username == username || user.phone == phone) {
				found = true;
			}
		});
		return found;
	}
}