import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
	
	type User {
		id: ID!
		username: String!
	}

	type Mutation {
		login(username: String!, password: String!): User
	}

	type RootQuery {
		viewer: User
	}

	schema {
	  query: RootQuery
	  mutation: Mutation
	}
`;

export default makeExecutableSchema({
	typeDefs,
	resolvers
});
