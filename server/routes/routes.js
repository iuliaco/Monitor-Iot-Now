//server/routes/routes.js
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('../../models/user.js');
var Tables = require('./../../models/tables.js'); 
var Seccode = require('./../../models/seccode.js');
var ObjectID = require('mongodb').ObjectID;

const passport = require('passport');

const jwt = require('jsonwebtoken');
module.exports = function(io){
  var router = express.Router();

  router.put('/tables/:security_code/:id',(req,res,next) =>{
    var { value1, value2} = req.body;
    Seccode.findOne({security_code: req.params.security_code})
    .exec(function (err, seccode) {
      if (err || seccode==null) return res.status(500).send(err);
    console.log(req.user,req.body, req.params);
    var datas={value1,value2, "id":req.params.id};
    Tables.findOneAndUpdate({_id: req.params.id, userId:new ObjectID(seccode.userId)},{ $push: { value1: value1, value2: value2}}, function (err, data) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!data) {
            return res.status(404).end();
        }
       
        console.log("yayayay");
        io.emit('addPoint',datas);
        return res.status(200).send(data);
    })
    
  })
})
    
  
  
router.post('/signup', passport.authenticate('signup', { session : false }) , async ( req, res, next) => {
//	if(err){console.log(err);console.log("problema este in singup");res.send(err);}  
  res.json({ 
    message : 'Signup successful',
    user : req.user 
  })
});

router.post('/login', async (req, res, next) => { 
	//if(err){console.log(err);}


  const {remember}= req.body;

  console.log("aici am ajuns");
  passport.authenticate('login', async (err, user, info) => {  
    try {
      if(err || !user){
        console.log(JSON.stringify(err));
        res.status(404).send(err);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error);
        console.log("intru in login in routes ");
        console.log("user: " +user);
        console.log(error);
        const body = { _id : user._id, email : user.email };
          if(!remember){
        const token = jwt.sign({ user : body },'top_secret',{
          expiresIn: "1d"} );
        console.log("nu si-a amintit doar 1 zi "+ token);
        return res.json({ token });
  
      }
        else { const token = jwt.sign({ user : body },'top_secret',{
          expiresIn: "7d"} ); console.log("si-a amintit boss " +token);
          return res.json({ token });

        }
        //Send back the token to the user
      });   
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

return router;

}