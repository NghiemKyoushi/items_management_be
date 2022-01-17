require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const useRouter = require("./routes/userRoute");
const itemRouter = require("./routes/itemRoute");
var cors = require("cors");
const cloudinary = require("cloudinary").v2;
const bodyParser = require('body-parser');


mongoose.connect("mongodb://localhost/items_management", {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log("Connect to Database"));
db.once("open", () => console.log("Connected to database"));
app.listen(3030, () => console.log("Server Started"));



// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// let headers = new Headers();
// // image upload API
// headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
// headers.append('Access-Control-Allow-Credentials', 'true');
app.post("/image-upload",cors(), (request, response) => {
  // collected image from a user
  const data = {
    image: request.body.image,
  };
  // upload image here
  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      response.status(200).send({
        message: "success",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });
});

app.use(express.json());
app.use("/users", cors(), useRouter);
app.use('/item',cors(), itemRouter )
