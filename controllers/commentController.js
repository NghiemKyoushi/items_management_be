const { json } = require("body-parser");
const CommentSchema = require("./commentController");


const createComment = async (req, res) => {
    try{
        const {userID, content} = req.body;
        const newComment = await CommentSchema({
            userID: userID,
            content: content,
            like: [],
            reply: []
        });
        const saveComment = await newComment.save();
        if(saveComment){
            res.json({message: "save comment successfully"});
        }
    }catch(err){
        res.json({err: "err"})
    }
}
const addReply = async (res, req) => {
    try{

    }catch(err){

    }
}

const updateLike = async (req, res) => {
    try{

    }catch(err){
        
    }
}
exports.createComment = createComment;