const mongoose = require ('mongoose');
const ItemsSchema = require('../models/itemsSchema');
const  houseController = require("./houseController");
const createItem = async (req, res) => {
    const {userID, name, shortName, product_code, position, expired_date, category,create_at, picture_url} = req.body;

    try{
        const newItem = await ItemsSchema({
            name: name,
            shortName: shortName,
            product_code: product_code,
            position: position,
            expired_date: new Date(),
            category: category,
            create_at: new Date(),
            picture_url: picture_url
        })
        let saveItem = await newItem.save();
        if(saveItem){
            houseController.addItemToCart({body: {userID: userID, item: saveItem}});
            res.json({message: "saved item "});
        }else{
            res.json({message: "not saved item"})
        }
    }catch(err) {
        res.json({message: "err"})
        console.log(err);
    }
}


exports.createItem = createItem;