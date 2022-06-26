import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';


const book = Type.Object({
	id: Type.String(),
	name: Type.String(),
	
});
type book = Static<typeof book>;

export let books: book[] = [
	{ id: '1', name: 'the fault in our stars'},
	{ id: '2', name: 'red sun ' },
	{ id: '3', name: 'everything everything'},
	{ id: '4', name: 'about'},
	
	
]

export default async function (server: FastifyInstance) {

server.route({
    method: 'DELETE',
    url: '/book/:id',
    schema: {
        summary: 'Delete a book by id',
        tags: ['DELETE'],
        params: Type.Object({
            id: Type.String(),
        }),
    },
    handler: async (request, reply) => {
        const id = (request.params as any).id as string;
        books = books.filter((c) => c.id !== id);

        return books;
    },
});

}

