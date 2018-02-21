import React from 'react';

const Protected = ({ user, logout }) => {
	return (
		<div>
			<h1> Welcome {user.username}</h1>
			<button onClick={logout}>logout</button>
		</div>
	);
};

export default Protected;
