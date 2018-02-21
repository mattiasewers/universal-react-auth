import { User } from '../db';

export default {
	RootQuery: {
		viewer: (root, args, { user }) => {
			if (!user) {
				throw new Error('Please login!');
			}
			return User.findById(user.user_id);
		}
	},
	Mutation: {
		async login(root, { username, password }, ctx) {
			const user = await User.findOne({ username }).exec();
			if (!user) {
				throw new Error('Wrong username or password');
			}
			const valid = await user.verifyPassword(password);
			if (!valid) {
				throw new Error('Wrong username or password');
			}

			return { user };
		}
	}
};
