const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

app.listen(PORT, () => {
	console.log(`listening on http://localhost:${PORT}`);
});
