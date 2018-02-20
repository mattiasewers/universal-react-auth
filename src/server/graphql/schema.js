import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
	
	type User {
		id: ID!
		username: String!
	}

	type RootQuery {
		viewer: User
	}
`;

export default makeExecutableSchema({
	typeDefs,
	resolvers
});
