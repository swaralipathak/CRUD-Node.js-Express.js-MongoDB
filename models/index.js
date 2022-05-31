const mongoose = require("mongoose");

var foodSchema=mongoose.Schema({
  name:String,
  type:String,
  chef:String
});

module.exports=mongoose.model('recipes', foodSchema);