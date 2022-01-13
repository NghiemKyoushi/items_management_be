const mongoose = require("mongoose");
const { Schema } = mongoose;

const HomeSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: Object,
    },
  ],
});

module.exports = mongoose.model("house", HomeSchema);
