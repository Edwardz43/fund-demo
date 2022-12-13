import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import {RegisterRoutes} from '../build/routes';
import koaStatic from 'koa-static';
import {koaSwagger} from 'koa2-swagger-ui';
import path from 'path';
import {insertCorrelationId} from './middlewares/request-id';
import {logRequest} from './middlewares/request-log';

export const app = new Koa();
app.use(bodyParser());
app.use(insertCorrelationId);
app.use(logRequest);

// exception middleware
app.use(async (context, next) => {
	try {
		await next();
	} catch (err: any) {
		context.status = err.status || 500;
		context.body = err.message || 'An error occurred during the request.';
	}
});

// routers config
const router = new Router();
RegisterRoutes(router);
app.use(router.routes()).use(router.allowedMethods());

// swagger config
app.use(koaStatic('../build/swagger.json'));
app.use(
	koaSwagger({
		routePrefix: false,
		hideTopbar: true,
		swaggerOptions: {
			spec: require(path.join(__dirname, '../swagger.json'))
		},
	}),
);

