const mongoose = require ('mongoose');
const ItemsSchema = require('../models/itemsSchema');
const  houseController = require("./houseController");
const createItem = async (req, res) => {
    const {userID, name,description,price, shortName, product_code, position, expired_date, category, picture_url} = req.body;
    console.log("body", userID)
    try{
        const newItem = await ItemsSchema({
            name: name.trim(),
            shortName: shortName.trim(),
            // product_code: product_code,
            position: position,
            expired_date: new Date(expired_date),
            category: category.trim(),
            create_at: new Date(),
            picture_url: picture_url,
            description: description.trim(),
            price: price.trim()
        })
        let saveItem = await newItem.save();
        if(saveItem){
            houseController.addItemToCart({body: {userID: userID, item: saveItem}});
            res.json({message: "saved item"});
        }else{
            res.json({message: "not saved item"})
        }
    }catch(err) {
        res.json({message: "err"})
        console.log(err);
    }
}


exports.createItem = createItem;