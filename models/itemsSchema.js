const mongoose = require("mongoose");
const {Schema} = mongoose;

const ItemsSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    product_code:{
        type:String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    expired_date: {
        type: Date,
        required: true
    },
    category:{
        type:String,
        required:true
    },

    create_at:{
        type: Date,
        required: true
    },
    picture_Url:{
        type: String
    }
})

module.exports = mongoose.model("items", ItemsSchema);