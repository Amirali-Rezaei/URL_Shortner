const User = require("../models/user");

const signUp = async (req, res) => {
	console.log(req.body);
	if (req.body.email && req.body.userName && req.body.password) {
		try {
			await User.create(req.body);
			res.redirect("/");
		} catch (error) {
			console.log(error);
		}
	}
};

module.exports = signUp;
