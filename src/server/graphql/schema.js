import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
	
	type User {
		id: ID!
		username: String!
	}

	type Payload {
		user: User!
		token: String!
	}

	type Mutation {
		login(username: String!, password: String!): Payload
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
