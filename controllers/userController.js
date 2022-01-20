 require("dotenv").config();

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/usersSchema');
const { validationResult } = require("express-validator");
const JWT = require ("jsonwebtoken");
const mongoose = require("mongoose");
const cookie = require('cookie');
const houseController= require("./houseController");
const COOKIE_LIFE_TIME= 1000000;

const encodeToken = (userID, userName, auth) => {
    return JWT.sign(
        {
            iss: "Nghiem Duong",
            sub: userID,
            uname: userName,
            iat: new Date().getTime(),
            auth: auth,
            exp: new Date().setDate(new Date(Date.now() + COOKIE_LIFE_TIME))
        },
        process.env.JWT_SCECRET
    )
}

const signUp = async (req, res) => {
    const {username , password} = req.body;
    try{
        // const error = validationResult(req);
        // if(!error.isEmpty()){
        //     return res.status(422).jsonp(error.array())
        // }
        const findUser = await User.findOne({username});
        if (findUser) {
            return res.json({
                success: false,
                message: "Username has already been taken"
            })
        }
        const hash = await bcrypt.hash(password, 10);
        const createUser = new User({
            username: username,
            password: hash,
            authority: "client",
            create_at: new Date()

        })
        const saveUser = await createUser.save();
        if(saveUser){
            houseController.createHouse({body: {userID: saveUser._id}});
            res.json({message: "register successfully"});

        }else{
            res.json({message: "register false"})
        }
        
    }catch(error) {
        res.json({ message: `signup failed` })
    }
    
}
const login = async (req, res) => {
    // const error = validationResult(req);
    // if(!error.isEmpty()){
    //     return res.status(422).jsonp(error.array())
    // }
    try{
        const userDB = await User.findOne({ username: `${req.body.username}` });
        const isSame = await bcrypt.compare(req.body.password, userDB.password);

        if(isSame){
            if(userDB.authority === "client"){
                console.log("vao");
                const token = encodeToken(userDB._id, userDB.username, "client");
                console.log(token);

                res.cookie('login', token, { expires: new Date(Date.now() + COOKIE_LIFE_TIME) });
            res.status(201).json({
                message:"Login successfully",
                token: token
            })
            }
        }else{
            res.json({
                message:"username or password is failed"
            })
        }
    }catch(error){
        res.json({
            message: "Account not exist"
        })
    }
}
const getAllUser = async (req, res) => {
    try{
        const {id} = req.params;
        console.log(id);
        const findAll = await User.find({});
        // console.log(user._id.toString() !== id);
        
        const getAllUser = findAll.filter((user) => user._id.toString() !== id)
        res.json({
            user: getAllUser
        })
    }catch(err) {
        res.json({err: "err"});
        console.log(err);
        
    }
}

// const updateUser = async (req, res) => {
//     try{
//         const {}
//     }catch(err){

//     }
// }
exports.signUp = signUp;
exports.login = login;
exports.getAllUser = getAllUser;