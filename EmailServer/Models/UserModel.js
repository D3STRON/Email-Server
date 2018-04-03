var mongoose= require('mongoose')
var Schema= mongoose.Schema

var userSchema = new Schema({
    userId: String,
    password: String,
    emails:{
           sent_email:[],
           recieved_email:[]
         }
})

var User = mongoose.model('User',userSchema)
module.exports=User

module.exports.updateUser= function(updatedUser){
  User(updatedUser).save(function(err){
    if(err) throw err
    else{
      console.log("Updated user")
    }
  })
}

module.exports.updateRecievedMail= function(email)
{
    User.findOne({userId:email.to},function(err,data){
      if(err) throw err
      else{
        console.log(data)
          data.emails.recieved_email.push(email)
          User(data).save(function(err){
            if(err) throw err
            else{
              console.log("Updated user")
            }
          })
      }
    })
}

module.exports.updateSentMail= function(email)
{
  User.findOne({userId:email.from},function(err,data){
    if(err) throw err
    else{
        data.emails.sent_email.push(email)
           User(data).save(function(err){
             if(err) throw err
             else{
               console.log('Updated User')
             }
           })
        }
    })
}
