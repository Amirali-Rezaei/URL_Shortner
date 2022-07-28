const express = require("express");
const router = express.Router();
const shorter = require("../controllers/shorter");
const deleteUrl = require("../controllers/deleteUrl");
const Url = require("../models/url");

router.get("/", async (req, res) => {
	if (req.session.user && req.cookies.user_seed) {
		const urls = await Url.find({ userId: req.session.user._id }).sort({
			createdAt: -1,
		});
		return res.render("panel", { user: req.session.user, urls });
	} else {
		return res.redirect("/");
	}
});

router.post("/shortNewUrl", shorter);
router.get("/deleteUrl/:id", deleteUrl);

module.exports = router;
