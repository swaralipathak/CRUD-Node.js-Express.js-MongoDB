const express = require("express");
const app = express();
const mongoose = require("mongoose");
const food=require('./models/index.js');
const parser=require('body-parser');

//body parser for taking input parameters
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

//connecting with mongoose
mongoose.connect('mongodb+srv://swarali:swarali@crud.xxtad.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology:true, useNewUrlParser:true });

var connection=mongoose.connection;
connection.once('open',() => {
  console.log("Connection with MongoDB Successful!.....");
})

//set views folder and fileextension for ui screen
app.set('view engine', 'ejs');

//first page on opening link will be insert
app.get('/', (req,res) => {
  res.render('insert');
});

//sending input parameters to db
app.post('/insert', (req,res) => {
  var recipe=new food({
    name:req.body.name,
    type:req.body.type,
    chef:req.body.chef
  });
  recipe.save(() => {
    res.redirect('/saved');
  });
});
//Show saved page
app.post('/saved', (req, res) => {
  res.redirect('/saved');
  console.log("Back to insert page!");
});

//showing inputs table of all entries in show.ejs file
app.get('/show', (req, res) => {
  food.find({},(err,result) => {
    res.render('show', {recipes:result});
  });
});

//Deleting the response
app.get('/delete/:id', async (req, res) => {
  await food.findByIdAndDelete(req.params.id);
  res.redirect('/show');
  console.log("Item Deleted!");
});

//editing the inputs
app.get('/edit/:id', (req, res) => {
  food.findById(req.params.id, (err,result) => {
    res.render('edit', {recipes:result});
  }); 
});

//updating the edited inputs
app.post('/update/:id', async (req, res) => {
  await food.findByIdAndUpdate(req.params.id,req.body, {useFindAndModify: false});
  res.redirect('/show');
  console.log("Item Updated!");
});


app.listen(4000, () => console.log("server up and runing on port 4000!"));