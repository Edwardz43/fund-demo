import {Body, Controller, Get, Header, Path, Post, Route, Security, SuccessResponse, Tags} from 'tsoa';
import {User, UserCreationParams, UserCreationResponse, UserLoginParams, UserLoginResponse} from './models';
import {UsersService} from './service';
import {inject} from 'inversify';
import {provideSingleton} from '../util/provideSingleton';
import {AccountsService} from '../accounts/service';


@Tags('user')
@Route('users')
@provideSingleton(UsersController)
export class UsersController extends Controller {
	private readonly userSvc: UsersService;
	private readonly accSvc: AccountsService;

	constructor(
		@inject(UsersService) userService: UsersService,
		@inject(AccountsService) accService: AccountsService,
	) {
		super();
		this.userSvc = userService;
		this.accSvc = accService;
	}

	/**
	 * Retrieves the details of an existing user.
	 * Supply the unique user ID from either and receive corresponding user details.
	 * @param _ The JWT token of the specific user
	 * @param userId The user's identifier
	 */
	@Get('{userId}')
	@Security('jwt')
	public async getUser(
		@Header('x-access-token') _: string,
		@Path() userId: number
	): Promise<User | string> {
		const user = this.userSvc.get(userId);
		if (user) {
			return user;
		}
		this.setStatus(400); // set return status 201
		return 'user not found';
	}

	/**
	 * Create a user with the info from request body.
	 */
	@SuccessResponse('201', 'Created')
	@Post()
	public async createUser(
		@Body() requestBody: UserCreationParams
	): Promise<UserCreationResponse> {
		const userId = this.userSvc.create(requestBody);
		if (userId < 0) {
			this.setStatus(400);
			return {error: 'user already existed'};
		}
		const accountId = this.accSvc.create(userId);
		if (!accountId) {
			this.setStatus(400);
			return {error: 'account creation failed'};
		}
		return {
			success: true,
			id: userId,
			accountId
		};
	}

	/**
	 * Process user login
	 */
	@Post('login')
	public async login(@Body() requestBody: UserLoginParams): Promise<UserLoginResponse> {
		const resp = this.userSvc.login(requestBody);
		if (resp) {
			return {token: resp};
		}
		this.setStatus(400);
		return {error: 'user not found'};
	}
}
