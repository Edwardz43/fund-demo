import {Body, Controller, Header, Post, Route, Security, SuccessResponse, Tags} from 'tsoa';
import {provideSingleton} from '../util/provideSingleton';
import {SignAgreementParameters} from './models';

@Tags('agreement')
@Route('agreements')
@provideSingleton(AgreementsController)
export class AgreementsController extends Controller {
	@Post()
	@SuccessResponse('201', 'Created')
	@Security('jwt')
	public async sign(
		@Header('x-access-token') _: string,
		@Body() requestBody: SignAgreementParameters): Promise<string | void> {
		console.log(requestBody);
		return;
	}
}