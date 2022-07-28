const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
	{
		fullUrl: {
			type: String,
			required: true,
		},
		shortUrl: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		clicks: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("URL", urlSchema);
