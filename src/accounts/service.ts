import {provideSingleton} from '../util/provideSingleton';
import {inject} from 'inversify';
import {AccountsRepo} from './repo';

@provideSingleton(AccountsService)
export class AccountsService {
	private repo: AccountsRepo;

	constructor(@inject(AccountsRepo) accountRepo: AccountsRepo) {
		this.repo = accountRepo;
	}

	public create(userId: number): string | null {
		const id = this.repo.create(userId);
		if (!id) {
			return null;
		}
		return id;
	}
}