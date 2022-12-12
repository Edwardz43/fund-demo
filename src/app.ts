import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import {RegisterRoutes} from '../build/routes';
import koaStatic from 'koa-static';
import {koaSwagger} from 'koa2-swagger-ui';
import path from 'path';

export const app = new Koa();
app.use(bodyParser());

const router = new Router();

RegisterRoutes(router);

app.use(async (context, next) => {
	try {
		await next();
	} catch (err: any) {
		context.status = err.status || 500;
		context.body = err.message || 'An error occurred during the request.';
	}
});

app.use(router.routes()).use(router.allowedMethods());
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

