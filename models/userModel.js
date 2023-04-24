const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add Email!"],
        unique: [true, "This Email is already taken"],
    },
    password: {
        type: String,
        required: [true, "Password can not be empty"]
    }

},{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);