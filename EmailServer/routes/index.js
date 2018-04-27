var express= require('express')
var router= express.Router()
var User= require('../Models/UserModel')
var Email= require('../Models/EmailModel')

router.get('*',function(req,res){
  res.sendfile('./angular/index.html')
})

router.post('/login',function(req,res){
  User.findOne({userId:req.body.userId},function(err,data){
    if(err){
      throw err
    }
    else{
        if(data==null)
        {
          User.updateUser(req.body)
           res.json(req.body)    
        }
        else if(data.password!==req.body.password){
          res.json({
            success:false
          })
        }
        else{
             res.json(req.body)
        }
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

router.post('/Upload', function(req,res){
  console.log(req.body)
  res.send(true)
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
