import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';


const fave = Type.Object({
	id: Type.String(),
	name: Type.String(),
	
});
type fave = Static<typeof fave>;

const GetQuery = Type.Object({
	name: Type.Optional(Type.String()),
});
type GetQuery = Static<typeof GetQuery>;


export let faves: fave[]=[]; //**** empity array 
	
	
export default async function (server: FastifyInstance) {

    server.route({
		method: 'POST',       
		url: '/fav',
		schema: {
			summary: 'add new books to fave',
			tags: ['ADD'],
			body: fave,
		},
		handler: async (request, reply) => {
			const fave: any = request.body;
            faves.push(fave)
               return faves;
			
		},
	});
//*********************************************************************** 
	server.route({
		method: 'GET',
		url: '/fav',
		schema: {
			summary: 'search in fav',
			tags: ['get query'],
			querystring: GetQuery,
			
		},
		handler: async (request, reply) => {
			const query = request.query as GetQuery;
			if (query.name) {
				return faves.filter((c) => c.name.includes(query.name ?? ''));
			} else {
				return faves;
			}
		},
	});


}




