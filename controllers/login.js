const User = require("../models/user");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
	try {
		const user = await User.findOne({
			userName: req.body.userName,
		});

		if (user) {
			const result = await bcrypt.compare(
				req.body.password,
				user.password
			);

			if (result) {
				req.session.user = user;

				return res.redirect("/panel");
			} else {
				return res.render("/");
			}
		} else {
			res.render("login");
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = login;
