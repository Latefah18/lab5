import fastifyAutoload from '@fastify/autoload';/// IMPORT  AUTOLOAD 
import fastifySwagger from '@fastify/swagger';// IMPORT SWAGGER 
import { ajvTypeBoxPlugin, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { join } from 'path';

/// EXPORT THE SRVER
export const server = fastify({
	logger: true,
	ajv: {
		customOptions: {
			removeAdditional: 'all',
			ownProperties: true,
		},
		plugins: [ajvTypeBoxPlugin],
	},
}).withTypeProvider<TypeBoxTypeProvider>();


server.register(fastifySwagger, {
	routePrefix: '/docs',
	exposeRoute: true,
	mode: 'dynamic',
	openapi: {
		info: {
			title: 'Latefah-API',
			version: '0.0.1',
		},
	},
});



//***************** */ to Run All router togather********************************* 
server.register(fastifyAutoload, {
	dir: join(__dirname, 'routes'),
});
