const Url = require("../models/url");

const deleteUrl = async (req, res) => {
	if (req.session.user && req.cookies.user_seed) {
		try {
			await Url.findByIdAndDelete(req.params.id);
			return res.redirect("/panel");
		} catch (error) {
			console.log(error);
		}
	} else {
		return res.redirect("/");
	}
};

module.exports = deleteUrl;
