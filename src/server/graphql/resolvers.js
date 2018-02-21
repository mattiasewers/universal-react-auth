import { User } from '../db';

export default {
	RootQuery: {
		viewer: (root, args, { user }) => {
			if (!user) {
				throw new Error('Please login!');
			}
			return User.findById(user._id);
		}
	},
	Mutation: {
		async login(root, { username, password }, { login }) {
			const user = await User.findOne({ username }).exec();
			if (!user) {
				throw new Error('Wrong username or password');
			}
			const valid = await user.verifyPassword(password);
			if (!valid) {
				throw new Error('Wrong username or password');
			}

			login({ username: user.username, _id: user._id });

			return { user };
		}
	}
};
