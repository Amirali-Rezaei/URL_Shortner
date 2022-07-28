const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		userName: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", function (next) {
	const user = this._doc;

	if (this.isNew || this.isModified("password")) {
		const salt = bcrypt.genSalt(10);
		salt.then((salt) => {
			return bcrypt.hash(user.password, salt);
		})
			.then((hash) => {
				user.password = hash;
				return next();
			})
			.catch((err) => console.log(err));
	}
});

module.exports = mongoose.model("User", userSchema);
