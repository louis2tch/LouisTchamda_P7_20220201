//const Sauce = require('../models/sauce');
const fs = require('fs');
let con = require('./config');

//const jwt = require('jsonwebtoken');

exports.createChat = (req, res, next)=>{
   // console.log("ICI Chat = " + req.body.chat.comment);
    con.query(`insert into chat (id_user, comment, times) values ('${req.body.chat.id_user}', '${req.body.chat.comment}', NOW() )`, function (err, result) {
        if (err) throw err ;
        con.query(`select a.id as id_chat, a.times, a.id_user, a.comment, a.userlike, a.likes, a.dislikes, b.id, b.id_dep, b.first_name, b.last_name, b.email, c.id, c.name from groupomania.chat a, groupomania.users b, groupomania.departments c where a.id_user = b.id and b.id_dep = c.id order by a.times`, function (err1, result1) {
            if (err1) throw err1;  //console.log(result1);
            return res.status(201).json({
                v: result1
            });
        });
    });
};
 
exports.modifyChat = (req, res, next) => {
   
    if(req.body.chat.comment !="")
    con.query(`update chat set comment = '${req.body.chat.comment}'  where id = '${req.params.id}'`, function (err, result) {
        if (err) throw err;  
        con.query(`select a.id as id_chat, a.times, a.id_user, a.comment, a.userlike, a.likes, a.dislikes, b.id, b.id_dep, b.first_name, b.last_name, b.email, c.id, c.name from groupomania.chat a, groupomania.users b, groupomania.departments c where a.id_user = b.id and b.id_dep = c.id order by a.times`, function (err1, result1) {
            if (err1) throw err1;  //console.log(result);
            return res.status(201).json({
                v: result1,
                id_now: req.params.id,
                comment_now: req.body.chat.comment
            });
        });
    });
};

exports.deleteChat = (req, res, next) => {

    if(req.params.id !="")
    con.query(`delete from chat where id = '${req.params.id}'`, function (err, result) {
        if (err) throw err;  
        con.query(`select a.id as id_chat, a.times, a.id_user, a.comment, a.userlike, a.likes, a.dislikes, b.id, b.id_dep, b.first_name, b.last_name, b.email, c.id, c.name from groupomania.chat a, groupomania.users b, groupomania.departments c where a.id_user = b.id and b.id_dep = c.id order by a.times`, function (err1, result1) {
            if (err1) throw err1;  //console.log(result);
            return res.status(201).json({
                v: result1
            });
        });
    });
   
};

exports.getoneChat = (req, res, next) =>{
  
};

exports.getChat = (req, res, next)=>{
     
    con.query(`select a.id as id_chat, a.times, a.id_user, a.comment, a.userlike, a.likes, a.dislikes, b.id, b.id_dep, b.first_name, b.last_name, b.email, c.id, c.name from groupomania.chat a, groupomania.users b, groupomania.departments c where a.id_user = b.id and b.id_dep = c.id order by a.times`, function (err, result) {
        if (err) throw err;  //console.log(result);
        return res.status(201).json({
            v: result
        });
    });
      
}; 


exports.generateLike = (req, res, next) => {
    
    con.query(`select * from  chat where id = '${req.params.id}'`, function (err, result) {
        if (err) throw err;  
        let id = result[0].id;
        let id_user = result[0].id_user;
        let userlike = result[0].userlike;
        let likes = result[0].likes;

        let likeBody = req.body.chat.like;
        let dislikeBody = 0;
        //if(likeBody == 1)  dislikeBody = 0; 
       
        if(userlike == null || userlike == '[null]')
        userlike = `[{"id_user":"${req.body.chat.id_user}", "like":"1", "dislike":"0"}]`;
       
        userlike = JSON.parse(userlike);
        let existUser = false; let deleteIndex = 0;
        for (let i of userlike){   
            if(i.id_user == req.body.chat.id_user){
                i.like = likeBody;
                i.dislike = dislikeBody; 
                existUser = true; 
               // console.log(" par "+`${i.id_user} == ${req.body.chat.id_user} indexUser = ${existUser}`);
                if(likeBody == 0){ 
                    delete userlike[deleteIndex];
                    userlike = JSON.stringify(userlike);
                    userlike = userlike.replace(/null,/g,'');
                    userlike = userlike.replace(/,null/g,'');
                    userlike = JSON.parse(userlike);

                }
            }
            deleteIndex++;
        }
        if (existUser == false){
            userlike.push({id_user:`${req.body.chat.id_user}`, like:`${likeBody}`, dislike:'0'}); 
        }
        
        if(likeBody == 0) likeBody = -1;
        userlike = JSON.stringify(userlike); 
        con.query(`update chat set userlike = '${userlike}', likes='${likeBody+likes}', dislikes='${dislikeBody}' where id = '${req.params.id}'`, function (err1, result1) {
           if (err1) throw err1;  
            //console.log(result1);
        });

        //console.log(id + " :: " +id_user+ " User = "+req.body.chat.id_user);
        //console.log(userlike);
        con.query(`select a.id as id_chat, a.times, a.id_user, a.comment, a.userlike, a.likes, a.dislikes, b.id, b.id_dep, b.first_name, b.last_name, b.email, c.id, c.name from groupomania.chat a, groupomania.users b, groupomania.departments c where a.id_user = b.id and b.id_dep = c.id order by a.times`, function (err1, result1) {
            if (err1) throw err1;  //console.log(result);
            return res.status(201).json({
                v: result1
            });
        });
    });
}

exports.generateDisLike = (req, res, next) => {
    
    con.query(`select * from  chat where id = '${req.params.id}'`, function (err, result) {
        if (err) throw err;  
        let id = result[0].id;
        let id_user = result[0].id_user;
        let userlike = result[0].userlike;
        let dislikes = result[0].dislikes;

        let dislikeBody = req.body.chat.dislike;
        let likeBody = 0;
        //if(likeBody == 1)  dislikeBody = 0; 
       
        if(userlike == null || userlike == '[null]')
        userlike = `[{"id_user":"${req.body.chat.id_user}", "like":"0", "dislike":"1"}]`;
       
        userlike = JSON.parse(userlike);
        let existUser = false; let deleteIndex = 0;
        for (let i of userlike){   
            if(i.id_user == req.body.chat.id_user){
                i.like = likeBody;
                i.dislike = dislikeBody; 
                existUser = true; 
                //console.log(" par "+`${i.id_user} == ${req.body.chat.id_user} indexUser = ${existUser}`);
                if(dislikeBody == 0){ 
                    delete userlike[deleteIndex];
                    userlike = JSON.stringify(userlike);
                    userlike = userlike.replace(/null,/g,'');
                    userlike = userlike.replace(/,null/g,'');
                    userlike = JSON.parse(userlike);

                }
            }
            deleteIndex++;
        }
        if (existUser == false){
            userlike.push({id_user:`${req.body.chat.id_user}`, like:'0', dislike:`${dislikeBody}`}); 
        }
        
        if(dislikeBody == 0) dislikeBody = -1;
        userlike = JSON.stringify(userlike); 
        con.query(`update chat set userlike = '${userlike}', likes='${likeBody}', dislikes='${dislikeBody+dislikes}' where id = '${req.params.id}'`, function (err1, result1) {
           if (err1) throw err1;  
            //console.log(result1);
        });

        //console.log(id + " :: " +id_user+ " User = "+req.body.chat.id_user);
        //console.log(userlike);
        con.query(`select a.id as id_chat, a.times, a.id_user, a.comment, a.userlike, a.likes, a.dislikes, b.id, b.id_dep, b.first_name, b.last_name, b.email, c.id, c.name from groupomania.chat a, groupomania.users b, groupomania.departments c where a.id_user = b.id and b.id_dep = c.id order by a.times`, function (err1, result1) {
            if (err1) throw err1;  //console.log(result);
            return res.status(201).json({
                v: result1
            });
        });
    });
}
