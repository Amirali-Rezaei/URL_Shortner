const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const { join } = require("path");
const auth = require("./routers/auth");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const panel = require("./routers/panel");
const Url = require("./models/url");

mongoose.connect("mongodb://localhost:27017/url_shortener", () => {
	console.log("Database connection established!");
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, "/public")));
app.use(cookieParser());
app.use(
	session({
		secret: "2108@@",
		key: "user_seed",
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 300000,
		},
	})
);
app.use(auth);
app.use("/panel", panel);

app.get("/", (req, res) => {
	if (req.session.user && req.cookies.user_seed) {
		return res.redirect("/panel");
	}
	return res.render("index");
});

app.get("/:shortUrl", async (req, res) => {
	const url = await Url.findOne({ shortUrl: req.params.shortUrl });

	if (url == null) return res.sendStatus(404);

	url.clicks++;
	url.save();

	res.redirect(url.fullUrl);
});

app.listen(PORT, () => {
	console.log(`listening on http://localhost:${PORT}`);
});
