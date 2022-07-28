const express = require("express");
const router = express.Router();
const signUp = require("../controllers/signup");
const login = require("../controllers/login");

router.get("/signUp", (req, res) => {
	if (req.session.user && req.cookies.user_seed) {
		return res.redirect("/panel");
	}
	return res.render("signup");
});

router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;
