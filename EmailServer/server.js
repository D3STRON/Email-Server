var express = require('express')
var bodyParser = require('body-parser');// important for req.body
var cookieParser = require('cookie-parser');
var socket= require('socket.io')
const path= require('path')
const crypto= require('crypto')
const multer = require('multer');

var User= require('./Models/UserModel')
var app= express()
var routes =require('./routes/index.js')
var mongoose= require('mongoose')
const mongoURI = 'mongodb://localhost/email'
mongoose.connect(mongoURI)
///for viewing request.body/////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
////////////////////////////// storage engine//////////////
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({storage: storage });
app.use(express.static(__dirname + '/angular'));////for using the index.html file for diplays///////////
app.use('/', routes)

//////////////////////////////////////////////


var server =app.listen("8000",function(err){
  if(err){
    throw err
  }
  else{
    console.log('Listening to port 8000')
  }
})


var io= socket(server)

io.on('connection',function(socket){
  console.log('Client connected to server', socket.id)
  socket.on('email',function(data){
    console.log(data)
    User.updateRecievedMail(data)
    User.updateSentMail(data)
    io.sockets.emit('email',data)
  })
})

app.post('/Upload', upload.single('file'),function(req,res, next){
  console.log(req.body)
  // console.log(req.file.filename)
  res.send("sucess")
})


/*
 var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})


var  storage = require('multer-gridfs-storage')({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: Date.now() + path.extname(file.originalname), //Appending extension
      bucketName: 'uploads'
      }
  }
})



*/
