const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    authority:{
        type: String 
    },
    create_at:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("users", UserSchema);