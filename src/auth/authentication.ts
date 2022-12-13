import {Request} from 'koa';
import {verify} from 'jsonwebtoken';

export const secret = 'my@secrEte';

export function koaAuthentication(
	request: Request,
	securityName: string,
	_?: string[]
): Promise<unknown> {
	if (securityName === 'jwt') {
		const token =
			request.get('token') ||
			request.query.token ||
			request.headers['x-access-token'];

		return new Promise((resolve, reject) => {
			if (!token) {
				reject(new Error('No token provided'));
			}
			verify(<string>token, secret, function (err: unknown, decoded: unknown) {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});
	}
	return new Promise((_, reject) => {
		reject(new Error('securityName not support'));
	});
}