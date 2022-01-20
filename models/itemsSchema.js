const mongoose = require("mongoose");
const {Schema} = mongoose;

const ItemsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    price:{
        type:String,
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
    picture_url:{
        type: String
    },
    description:{
        type:String
    }
})

module.exports = mongoose.model("items", ItemsSchema);