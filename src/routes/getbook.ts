import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';


const book = Type.Object({
	id: Type.String(),
	name: Type.String(),
	
});
type book = Static<typeof book>;

const GetQuery = Type.Object({
	name: Type.Optional(Type.String()),
});
type GetQuery = Static<typeof GetQuery>;


export let books: book[] = [
	{ id: '1', name: 'the fault in our stars'},
	{ id: '2', name: 'redsun ' },
	{ id: '3', name: 'everything everything'},
	{ id: '4', name: 'about'},
	
	
]

export default async function (server: FastifyInstance) {
	server.route({
		method: 'GET',
		url: '/books',
		schema: {
			summary: 'get book by name query',
			tags: ['get query'],
			querystring: GetQuery,
			
		},
		handler: async (request, reply) => {
			const query = request.query as GetQuery;

			if (query.name) {
				return books.filter((c) => c.name.includes(query.name ?? ''));
			} else {
				return books;
			}
		},
	});

}
