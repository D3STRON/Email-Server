var mongoose= require('mongoose')
var Schema= mongoose.Schema

var emailSchema = new Schema({
    to:String,
    from: String,
    subject:String,
    status:String,
    message: String
})

var Email = mongoose.model('Email',emailSchema)
module.exports=Email
