import * as Router from 'koa-router';
import {getStateValue} from '../util/ctxHelpers';

// black list
const ignoredUrls: string[] = ['/docs'];

export const logRequest: Router.IMiddleware = async (ctx, next) => {
	const correlationId = getStateValue(ctx, 'correlationId');

	if (!correlationId) {
		throw new Error(
			'Since correlationId was not set, which means that the insertCorrelationId middleware has not been run yet',
		);
	}

	if (ctx.method !== 'OPTIONS' && !ignoredUrls.includes(ctx.originalUrl)) {
		console.debug(
			{
				correlationId: correlationId,
				method: ctx.method,
				url: ctx.originalUrl,
			},
			'Request received',
		);
	}
	await next();
};
