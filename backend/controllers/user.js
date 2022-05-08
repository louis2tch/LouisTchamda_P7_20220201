const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let con = require('./config');
//const User = require('../models/user');

exports.signup = (req, res, next) => {
   bcrypt.hash(req.body.user.password, 10)
    .then(hash => {
        /*(const user = new User({
            email: req.body.email,
            password: hash*/
            con.query(`select email from users where email='${req.body.user.email}'`, function (err0, result0){
              if (result0.length == 0) 
              con.query(`insert into users (id_dep, email, password, first_name, last_name) values ('${req.body.user.id_dep}', '${req.body.user.email}', '${hash}', '${req.body.user.first_name}', '${req.body.user.last_name}')`, function (err, result) {
                  if (err) throw err;
                  con.query("select * from users order by first_name, last_name", function (err1, result1) {
                      if (err1) throw err1;
                      return res.status(201).json({
                          v: result1
                      });
                  });
              });
          }); 
  
        });
      
};

exports.login = (req, res, next) => {

    con.query(`select * from users where email='${req.body.user.email}'`, function (err, result){
      if (err){  throw err; } //console.log(result); 
      if(result!=''){ let  pw = result[0]; 
    
    bcrypt.compare(req.body.user.password, pw.password)
          .then(valid => {
            if (!valid) {
              console.log("Mot de passe incorrect !");
              return res.status(201).json({ error: 'Mot de passe incorrect !' });
            } 
            con.query(`select a.id as id_chat, a.times, a.id_user, a.comment, a.userlike, a.likes, a.dislikes, b.id, b.id_dep, b.first_name, b.last_name, b.email, c.id, c.name from groupomania.chat a, groupomania.users b, groupomania.departments c where a.id_user = b.id and b.id_dep = c.id order by a.times`, function (err1, result1) {
              if (err1) throw err1;  //console.log(result1); console.log(result1);
              //return res.status(201).json({
                 // v1: result1,
                //  v: result
             // });
             res.status(201).json({
              error: '',
              v1: result1,
              v: {id: pw.id,
                 id_dep: pw.id_dep,
                 email: pw.email,
                 first_name: pw.first_name,
                 last_name: pw.last_name,
                 role: pw.role,
                 token: jwt.sign(
                 { id: pw.id },
                 'RANDOM_TOKEN_SECRET',
                 { expiresIn: '24h' }
               )
              }
             }); //console.log("OK");
          });
        
          })
          .catch(error => res.status(500).json({ error }));
      } else return res.status(201).json({ error: 'Ce compte n\'existe pas' });
        
   // })
    //.catch(error => res.status(500).json({ error }));
  });
}

exports.modifyUser = (req, res, next) => { 
  /*Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })
  .then(() => res.status(200).json({message: 'Objet modifie !'}))
  .catch(error => res.status(400).json({error})); 
  */
  let first_name = req.body.user.first_name; 
  let last_name = req.body.user.last_name;
  let role = req.body.user.role;
  con.query(`update users set first_name='${first_name}', last_name='${last_name}', role='${role}' where id ='${req.params.id}'`, function (err, result) {
      if (err) throw err;
      con.query("select * from users order by first_name, last_name", function (err1, result1) {
          if (err1) throw err1;
          return res.status(201).json({
              v: result1
          });
      });
  });
};

exports.getoneUser = (req, res, next)=>{
  /*Sauce.findOne({ _id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json(error)); 
    */
    con.query(`select * from users where id ='${req.params.id}'  order by first_name, last_name`, function (err, result) {
      if (err) throw err;
      return res.status(201).json({
          v: result
      });
  });
}; 

exports.getUser = (req, res, next)=>{
  /*Sauce.find()
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(400).json({error}));
  */
  //res.status(200).json('ICI 3xx dep getall');
  con.query("select * from users order by first_name, last_name", function (err, result) {
      if (err) throw err;
      return res.status(201).json({
        v: result
      });
  });

}; 
