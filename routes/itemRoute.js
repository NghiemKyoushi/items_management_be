const express = require("express");
const router = express.Router();

const itemController = require ("../controllers/itemsController");
const houseController = require ("../controllers/houseController");

router.post('/addItem', itemController.createItem);

router.get('/getAllItem/:userID', houseController.getAllCart);

router.post('/searchItem', houseController.getItemByKey);

router.post('/deleteItem', houseController.deleteItemInCart);

router.post("/editItem", houseController.editItem);

module.exports = router;

