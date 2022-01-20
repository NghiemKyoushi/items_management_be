const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
//    userID:{
//        type:String
//    },
//    content:{
//        type:String
//    },
//    like:[{
//        liked_by: String
//    }],
//    reply:[{
//        content:{
//            type:String
//        },
//        guest_Id:{
//            type:String
//        }
//    }]
homeID: {
    type: String
},
body: {
    type:String
},
userName:{
    type:String
},
userID: {
    type:String
},
parentId:{
    type: String
},
createAt:{
    type:Date
}

});

module.exports = mongoose.model("comment", CommentSchema);
