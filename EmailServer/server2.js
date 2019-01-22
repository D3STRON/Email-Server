var express = require('express')
var cors = require('cors');

var app = express()
app.use(cors());

app.listen('8080',function(err){
    if(err) throw err
    else{
        console.log('server listening to 8080')
    }
})

app.get('/Upload',function(req,res){
  console.log(req.query)
  res.sendFile(__dirname + '/uploads/'+ req.query.filename)
})