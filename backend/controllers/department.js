//const Sauce = require('../models/sauce');
const fs = require('fs');
let con = require('./config');
//const jwt = require('jsonwebtoken');

exports.createDepartment = (req, res, next)=>{
    let departmentOject = req.body.department.name;
    var doit = 0; 
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
    //res.status(200).json('ICI 1xx dep getall');
};

exports.getDepartment = (req, res, next)=>{
  
    //res.status(200).json('ICI 3xx dep getall');
    con.query("select * from departments order by name", function (err, result) {
        if (err) throw err;
        return res.status(201).json({
            v: result
        });
    });

}; 



