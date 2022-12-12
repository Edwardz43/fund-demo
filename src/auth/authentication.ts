import {Request} from 'express';
import {verify} from 'jsonwebtoken';

export const secret = 'my@secrEte';

export function koaAuthentication(
	request: Request,
	securityName: string,
	_?: string[]
): Promise<string | undefined | void> {
	if (securityName === 'jwt') {
		const token =
			request.body.token ||
			request.query.token ||
			request.headers['x-access-token'];

		return new Promise((resolve, reject) => {
			if (!token) {
				reject(new Error('No token provided'));
			}
			verify(token, secret, function (err: any, decoded: any) {
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