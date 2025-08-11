const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true,
        min: 6,
        select: false
    },
    role: {
        type: String,
        enum: ["cashier", "admin"],
        default: "cashier",
        required: true
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("users", userSchema)
module.exports = UserModel