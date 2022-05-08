//const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express(); 
app.use(express.json());

const departmentRoutes = require('./routes/department');
const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/user');
const con = require('./controllers/config');

//mongodb+srv://tclo2:5society@cluster0.axifd.mongodb.net/piiquanteDB?retryWrites=true&w=majority

/*mongoose.connect('mongodb+srv://tclo2:5society@cluster0.axifd.mongodb.net/piiquanteDB?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
*/

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



app.use('/images', express.static(path.join(__dirname, 'images'))); //gestionnaire de routage pour acceder au doc images

app.use('/api/chat', chatRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/auth', userRoutes);


app.use('/api/marche',(req, res, next)=>{
  res.status(200).json('ICI 2xx');
});


/*  
con.query("insert into departments (name, comment) values ('Commptabilite', 'Tout le departement')", function (err, result) {
    if (err) throw err;
    console.log('Insert = ');
    console.log(result);
  });


con.query("select * from departments ", function (err, result) {
    if (err) throw err;
    console.log('Select all = ');
    console.log(result);
  });
*/
module.exports = app;