import {Controller, Get, Header, Route, Security, Tags} from 'tsoa';
import {provideSingleton} from '../util/provideSingleton';
import {JwtPayload, verify} from 'jsonwebtoken';
import {secret} from '../auth/authentication';
import {mockFunds} from '../../mocks/db/funds';
import {UsersService} from '../users/service';
import {inject} from 'inversify';
import {Fund} from './model';


interface GetFundListResponse {
	funds?: Fund[];
	error?: string;
}

@Tags('fund')
@Route('funds')
@provideSingleton(FundsController)
export class FundsController extends Controller {
	private userSvc: UsersService;

	constructor(@inject(UsersService) userService: UsersService) {
		super();
		this.userSvc = userService;
	}

	@Get()
	@Security('jwt')
	public async getFundList(@Header('x-access-token') token: string,): Promise<GetFundListResponse> {
		const payload = verify(token, secret) as JwtPayload;
		const {username, email} = payload;
		if (this.userSvc.exist({username, email})) {
			const funds = mockFunds();
			return {
				funds
			};
		}
		this.setStatus(400);
		return {error: 'token invalidation'};
	}
}