const shortId = require("shortid");
const Url = require("../models/url");

const shorter = async (req, res) => {
	if (req.session.user && req.cookies.user_seed) {
		const shortUrl = shortId.generate();
		const newUrl = {
			fullUrl: req.body.fullUrl,
			shortUrl: shortUrl,
			userId: req.session.user._id,
		};

		await Url.create(newUrl);

		return res.redirect("/panel");
	}
};

module.exports = shorter;
