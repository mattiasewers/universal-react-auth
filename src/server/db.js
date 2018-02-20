const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dev');

const schema = new mongoose.Schema({
	username: String
});

schema.plugin(require('mongoose-bcrypt'));

const User = mongoose.model('User', schema);

export { User };
