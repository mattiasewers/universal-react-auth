import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Login from './Login';
import Protected from './Protected';

const Home = ({ data: { viewer }, login, logout }) => {
	if (viewer) {
		return <Protected logout={logout} user={viewer} />;
	}
	return <Login login={login} />;
};

export const UserQuery = gql`
	query {
		viewer {
			id
			username
		}
	}
`;

const LoginMutation = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			user {
				id
				username
			}
		}
	}
`;

const LogoutMutation = gql`
	mutation {
		logout
	}
`;

export default compose(
	graphql(UserQuery, { options: { fetchPolicy: 'network-only' } }),
	graphql(LoginMutation, {
		props: ({ ownProps, mutate }) => ({
			login: ({ username, password }) =>
				mutate({
					variables: { username, password },
					update: (proxy, { data: { login } }) => {
						const data = { viewer: login.user };
						proxy.writeQuery({ query: UserQuery, data });
					}
				})
		})
	}),
	graphql(LogoutMutation, {
		props: ({ ownProps, mutate }) => ({
			logout: () =>
				mutate({
					update: (proxy, { data: { login } }) => {
						const data = { viewer: null };
						proxy.writeQuery({ query: UserQuery, data });
					}
				})
		})
	})
)(Home);
