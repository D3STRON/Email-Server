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
        if(data===null)
        {
          console.log(req.body)
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
    else if(data === null)
    {
      var emails = {sent_email:[],
                     recieved_email:[]
                    }
      res.json(emails)              
    }
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
