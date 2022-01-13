const express = require("express");
const router = express.Router();

const itemController = require ("../controllers/itemsController");
const houseController = require ("../controllers/houseController");

router.post('/addItem', itemController.createItem);

router.get('/getAllItem/:userID', houseController.getAllCart);

router.post('/searchItem', houseController.getItemByKey);

module.exports = router;

