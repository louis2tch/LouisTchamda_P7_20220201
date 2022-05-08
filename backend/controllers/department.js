//const Sauce = require('../models/sauce');
const fs = require('fs');
let con = require('./config');
//const jwt = require('jsonwebtoken');

exports.createDepartment = (req, res, next)=>{
    let departmentOject = req.body.department.name;
    /*delete departmentOject._id;
    const sauce = new Sauce({
        ...sauceOject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked:[],
        usersDisliked:[]

    });
    sauce.save()
    .then(()=>res.status(201).json({message: 'Objet enregistre' }))
    .catch(error => res.status(400).json({error:error |'impossiblie de creer la sauce'}));
*/ var doit = 0; 
   con.query("select name from departments where name='"+departmentOject+"'", function (err0, result0){
        if (result0.length == 0) 
        con.query("insert into departments (name, comment) values ('"+departmentOject+"', '')", function (err, result) {
            if (err) throw err;
            con.query("select * from departments order by name", function (err1, result1) {
                if (err1) throw err1;
                return res.status(201).json({
                    v: result1
                });
            });
        });
    });
    
};
 
exports.modifyDepartment = (req, res, next) => {
    /*Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({message: 'Objet modifie !'}))
    .catch(error => res.status(400).json({error})); 
    */
    let departmentOject = req.body.department.name;
    con.query(`update departments set name='${departmentOject}' where id ='${req.params.id}'`, function (err, result) {
        if (err) throw err;
        con.query("select * from departments order by name", function (err1, result1) {
            if (err1) throw err1;
            return res.status(201).json({
                v: result1
            });
        });
    });
};

exports.deleteDepartment = (req, res, next) => {
    /*Sauce.findOne({_id: req.params.id})
    .then(sauce =>{
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () =>{
            Sauce.deleteOne({ _id: req.params.id})
            .then(() => res.status(200).json({ message: 'Object supprime !'}))
            .catch(error => res.status(400).json({ error }));
        })
    })
    .catch(error => res.status(500).json({error}));
    */
    con.query(`delete from departments where id ='${req.params.id}'`, function (err, result) {
        if (err) throw err;
        con.query("select * from departments order by name", function (err1, result1) {
            if (err1) throw err1;
            return res.status(201).json({
                v: result1
            });
        });
    });
};

exports.getoneDepartment = (req, res, next) =>{
    /*Sauce.findOne({ _id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json(error)); 
    */
};

exports.getDepartment = (req, res, next)=>{
    /*Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}));
    */
    //res.status(200).json('ICI 3xx dep getall');
    con.query("select * from departments order by name", function (err, result) {
        if (err) throw err;
        return res.status(201).json({
            v: result
        });
    });

}; 



