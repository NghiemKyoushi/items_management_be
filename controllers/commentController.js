const { json } = require("body-parser");
const CommentSchema = require("../models/commentSchema");
const HomeSchema = require ("../models/houseSchema");

const createComment = async (req, res) => {
    try{
        const {userID,body, username,parentId } = req.body;
        const findHome = await HomeSchema.findOne({userID: userID});

        const newComment = await CommentSchema({
            homeID: findHome._id,
            userID: userID,
            body: body,
            userName:username,
            parentId:parentId,
            createAt: new Date()
            
        });
        const saveComment = await newComment.save();
        if(saveComment){
            res.json({message: "save comment successfully"});
        }
    }catch(err){
        // res.json({err: "err"})
        console.log(err);
        
    }
}
const getAllComment = async (req, res) => {
    try {
        const {id} = req.params;
        const findHome = await HomeSchema.findOne({userID: id});

        const findAllComment = await CommentSchema.find({homeID: findHome._id});
        res.json({
            comment: findAllComment
        })
    }catch(err) {
        res.json({
            err: "err"
        })
        console.log(err);
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
exports.getAllComment = getAllComment;