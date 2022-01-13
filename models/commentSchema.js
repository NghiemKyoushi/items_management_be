const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
   userID:{
       type:String
   },
   content:{
       type:String
   },
   like:[{
       liked_by: String
   }],
   reply:[{
       content:{
           type:String
       },
       guest_Id:{
           type:String
       }
   }]

});

module.exports = mongoose.model("comment", UserSchema);
