import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { Update} from '../controller/update';

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

//********************** update -_- ********************
server.route({
    method: 'PATCH',
    url: '/book',
    schema: {
        summary: 'Update a book  by id',
        tags: ['update'],
        body: Type.Partial(book),/// every thing optional
            
    },
    handler: async (request, reply) => {
        const newvalue: any = request.body;
        return Update(books, newvalue);
    

    
    }
});

}