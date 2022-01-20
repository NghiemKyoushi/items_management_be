const mongoose = require("mongoose");
const HouseSchema = require("../models/houseSchema");
const ItemsSchema = require("../models/itemsSchema");
const { json } = require("body-parser");

const createHouse = async (req, res) => {
  try {
    const { userID } = req.body;
    const house = new HouseSchema({
      userID: userID,
      cart: [],
    });
    let saveHouse = await house.save();
    if (res) {
      res.json(saveHouse);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
const addItemToCart = async (req, res) => {
  try {
    const { userID, item } = req.body;
    console.log(userID);
    const updateHouse = await HouseSchema.findOne({ userID: userID });
    console.log("items", item);
    console.log("hdhhd", updateHouse);

    updateHouse.cart.push(item);
    updateHouse.save();
    console.log("hdhhd", updateHouse);
    // if(res){
    //     res.json(updateHouse);
    // }
  } catch (err) {
    res.json({ err: "err" });
  }
};

const getAllCart = async (req, res) => {
  try {
    const id = req.params.userID;
    const findCart = await HouseSchema.findOne({ userID: id });
    res.json(findCart);
  } catch (err) {
    res.json({ err: "err" });
  }
};

const getItemByKey = async (req, res) => {
  try {
    const { userID, keyWord } = req.body;
    // console.log(keyWord);
    // let pattern = keyWord.split("").map((x) => {
    //     return `(?=.*${x})`
    // }).join("");
    // var regex = new RegExp(`${pattern}`, "g");
    let result=[];
    const findHouse = await HouseSchema.findOne({ userID: userID });
    let arrPosition = findHouse.cart.filter(
      (item) => item.position.trim() === keyWord.trim()
    );
    if (arrPosition.length > 0) {
      result = arrPosition;
    }
    let arrItemName = findHouse.cart.filter((item) => item.name.trim() === keyWord.trim());
    if (arrItemName.length > 0) {
      result=arrItemName;
    }
    res.status(200).json({
      result: result
    })
  } catch (err) {
    res.json({ err: "err" });
    // console.log(err);
  }
};
const deleteItemInCart = async (req, res) => {
  try {
    const { userID, itemId } = req.body;

    const findHouse = await HouseSchema.findOne({ userID: userID });
    findHouse.cart.map((item) => console.log(item._id.toString()));
    // console.log( findHouse.cart[0]._id.toString() == itemId);
    let arr = [];
    findHouse.cart.map((item) => {
      if (item._id.toString() !== itemId) {
        arr.push(item);
      }
    });
    findHouse.cart = arr;
    console.log(findHouse);
    findHouse.save();
    // const deleteInItem = await ItemsSchema.findByIdAndDelete({_id: itemId});
    res.json({ message: "success" });
  } catch (err) {
    res.json({ message: "fail" });
  }
};
const editItem = async (req, res) => {
  const {
    userID,
    itemId,
    name,
    description,
    price,
    shortName,
    position,
    expired_date,
    category,
  } = req.body;
  console.log("body", itemId);
  try {
    const findAndItem = await ItemsSchema.findByIdAndUpdate(
      { _id: itemId },
      {
        name: name.trim(),
        shortName: shortName.trim(),
        position: position.trim(),
        expired_date: new Date(expired_date),
        category: category.trim(),
        create_at: new Date(),
        description: description.trim(),
        price: price.trim(),
      }
    );
    console.log(findAndItem);

    const findItemById = await ItemsSchema.findById({ _id: itemId });
    console.log(findItemById);

    const findHouse = await HouseSchema.findOne({ userID: userID });
    findHouse.cart.map((item, index) => {
      if (item._id.toString() === findItemById._id.toString()) {
        findHouse.cart[index] = findItemById;
      }
    });
    findHouse.save();
    res.json({ message: "success" });
  } catch (err) {
    res.json({ message: "err" });
    console.log(err);
  }
};

exports.createHouse = createHouse;
exports.addItemToCart = addItemToCart;
exports.getAllCart = getAllCart;
exports.getItemByKey = getItemByKey;
exports.deleteItemInCart = deleteItemInCart;
exports.editItem = editItem;
