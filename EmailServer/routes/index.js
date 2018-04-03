var express= require('express')
var router= express.Router()
var User= require('../Models/UserModel')
var Email= require('../Models/EmailModel')

router.get('*',function(req,res){
  res.sendfile('./angular/index.html')
})

router.post('/login',function(req,res){
  User.findOne({userId:req.body.userId , password: req.body.password},function(err,data){
    if(err){
      throw err
    }
    else{
        if(data==null)
        {
          User.updateUser(req.body)
        }
        else{
          console.log('loggin in!')
        }
        res.json(req.body)
    }
  })
})

router.post('/MainPage',function(req,res){
   User.findOne(req.body,function(err,data){
     if(err) throw err
     else{
       res.json(data.emails)
     }
   })
})

router.post('/changeViewStatus',function(req,res){
   User.findOne({userId:req.body.userId}, function(err, data){
     if(err) throw err;
     else{
       data.emails.recieved_email[req.body.index].status="Read"
       User.updateUser(data)
       res.send("success")
     }
   })
})

module.exports= router
