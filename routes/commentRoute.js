const express = require("express");
const router = express.Router();

const CommentSchema = require("../models/commentSchema");
const commentController = require("../controllers/commentController");

router.post("/addComment", commentController.createComment);
router.get("/getAllComment/:id", commentController.getAllComment);


module.exports = router;
