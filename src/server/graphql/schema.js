import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
	
	type User {
		id: ID!
		username: String!
	}

	type Payload {
		user: User!
	}

	type Mutation {
		login(username: String!, password: String!): Payload
		logout: String
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
