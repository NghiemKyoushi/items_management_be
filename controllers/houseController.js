const mongoose = require("mongoose");
const HouseSchema = require("../models/houseSchema");
const { json } = require("body-parser");

const createHouse = async (req, res) => {
    try{
        const {userID} = req.body;
        const house = new HouseSchema({
            userID: userID,
            cart: []
        });
        let saveHouse = await house.save();
        if(res){
            res.json(saveHouse);
        }
    }catch(err) {
            res.status(500).send(err);
    }
}
const addItemToCart = async (req, res) => {
    try{
        const {userID, item} = req.body;
        const updateHouse = await HouseSchema.findOne({userID: userID});
        console.log("items", item)
        updateHouse.cart.push(item);
        updateHouse.save();
        console.log("hdhhd", updateHouse);
        if(res){
            res.json(updateHouse);
        }
    }catch(err){
        res.json({err: ""});
    }
}

const getAllCart = async (req, res) => {
    try{
        const id = req.params.userID;
        const findCart = await HouseSchema.findOne({userID: id});
        res.json(findCart)
    }catch(err){
        res.json({err: "err"})
    }
}

const getItemByKey = async (req, res) => {
    try{
        const {userID, keyWord} = req.body;
        // console.log(keyWord);
        // let pattern = keyWord.split("").map((x) => {
        //     return `(?=.*${x})`
        // }).join("");
        // var regex = new RegExp(`${pattern}`, "g");
        const findHouse = await HouseSchema.findOne({userID: userID});
        let arrPosition= findHouse.cart.filter(item => item.position === keyWord);
        if(arrPosition.length > 0){
            res.json(arrPosition)
        }
        let arrItemName =findHouse.cart.filter(item => item.name === keyWord);
        if(arrItemName.length > 0){
            res.json(arrItemName)
        }

    }catch(err){
        res.json({err: "err"})
        // console.log(err);
    }
}

exports.createHouse = createHouse;
exports.addItemToCart = addItemToCart;
exports.getAllCart = getAllCart;
exports.getItemByKey = getItemByKey;
