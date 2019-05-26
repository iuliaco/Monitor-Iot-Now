const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var randomize = require('randomatic');
var User = require('../../models/user.js');
var Tables = require('./../../models/tables.js'); 
var Seccode = require('./../../models/seccode.js'); 
module.exports = function(io){
const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/profile', (req, res, next) => {
  //We'll just send back the user details and the token
  res.json({
    message : 'You made it to the secure route',
    user : req.user,
    token : req.query.secret_token
  })
});
router.get('/fullprofile', (req, res, next) => {
  User.findOne({_id: new ObjectID(req.user._id)})
    .exec(function (err, user) {
      console.log(user);
      res.json(user);
    })
  
});

router.get('/seccode', (req, res, next) => {
  //We'll just send back the user details and the token
  Seccode.findOne({userId: new ObjectID(req.user._id)})
    .exec(function (err, seccode) {
      if (err) return handleError(err);
      console.log(seccode);
        if(seccode==null){
          var userId =  mongoose.Types.ObjectId(req.user._id);
          var security_code=randomize('Aa0', 15);
          console.log(security_code);
          var seccodeData= {userId,security_code};
          console.log(seccodeData);
        Seccode.create(seccodeData, function (err, seccodes) {
          if (err) return handleError(err);
          res.json( seccodes);
         })
      }
      else{
        console.log(seccode);
        res.json( seccode);


      }

     })
});

router.get('/tables',(req,res,next) =>{
  console.log(req.user._id);
Tables.find({userId: new ObjectID(req.user._id)})
    .exec(function (err, tables) {
      if (err) return handleError(err);
      console.log(tables);
      res.json( tables);
      
     })

})
router.get('/tables/:id',(req,res,next) =>{
  console.log(req.user._id);
Tables.findOne({userId: new ObjectID(req.user._id),_id:req.params.id})
    .exec(function (err, table) {
      if (err) return handleError(err);
      console.log(table);
      res.json( table );
      
     })

})
router.post('/tables',(req,res,next) =>{
  var {title, value1,value1_name, value2, value2_name,userId} = req.body;
  
  var userId =  mongoose.Types.ObjectId(req.user._id);
  var tablesData= {
    title, value1,value1_name, value2, value2_name ,userId };
  console.log(tablesData);
 // console.log(req);
  Tables.create(tablesData, function (err, tables) {
        if (err) return handleError(err);
        res.json( tables);
       })
  
  })
  router.put('/tables/:security_code/:id',(req,res,next) =>{
    var { value1, value2} = req.body;
    Seccode.findOne({userId: new ObjectID(req.user._id)})
    .exec(function (err, seccode) {
      if (err) return handleError(err);
      console.log(seccode);
        if(seccode.security_code!=req.params.security_code){
          return res.status(500).send(err);

        }
    else{
    console.log(req.user,req.body, req.params);
    var datas={value1,value2, "id":req.params.id};
    Tables.findOneAndUpdate({_id: req.params.id},{ $push: { value1: value1, value2: value2}}, function (err, data) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!data) {
            return res.status(404).end();
        }
       
        console.log("yayayay");
        io.emit('addPoint',datas);
        return res.status(200).send(data);
    })}
    
  })
})

  router.delete('/tables/:id',(req,res,next) =>{
    Tables.findOneAndRemove({_id: req.params.id}, function (err, data) {
      if (err) {
          return res.status(500).send(err);
      }
      console.log("yayayay");

      return res.status(200).send(data);
  })
  })
  return router;

};
