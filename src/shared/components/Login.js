import React from 'react';

class Login extends React.Component {
	handleLogin = e => {
		e.preventDefault();
		this.props.login({
			username: this.username.value,
			password: this.password.value
		});
	};

	render() {
		return (
			<div>
				<h1>Please login</h1>
				<form onSubmit={this.handleLogin}>
					<input
						ref={ref => (this.username = ref)}
						placeholder="Username"
						type="text"
					/>
					<input
						ref={ref => (this.password = ref)}
						placeholder="Password"
						type="password"
					/>
					<button onSubmit={this.handleLogin}>Submit</button>
				</form>
			</div>
		);
	}
}

export default Login;
