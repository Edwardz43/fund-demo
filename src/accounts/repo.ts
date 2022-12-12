import {Account} from './models';
import {provideSingleton} from '../util/provideSingleton';

@provideSingleton(AccountsRepo)
export class AccountsRepo {
	private db: Map<string, Account>;

	constructor() {
		this.db = new Map;
	}

	public create(userId: number): string | null {
		if (this.exist(userId)) {
			return null;
		}
		const id = this.genAccountId();
		this.db.set(id, {
			userId,
			balance: 0,
		});
		return id;
	}

	private exist(userId: number): boolean {
		let found = false;
		this.db.forEach((account) => {
			if (account.userId == userId) {
				found = true;
			}
		});
		return found;
	}

	private genAccountId(): string {
		const len = this.db.size;
		return 'acc' + ((len + 1).toString().padStart(10, '0'));
	}
}