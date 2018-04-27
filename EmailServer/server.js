var express = require('express')
var bodyParser = require('body-parser');// important for req.body
var cookieParser = require('cookie-parser');
var socket= require('socket.io')
const path= require('path')
const crypto= require('crypto')
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

var User= require('./Models/UserModel')
var app= express()
var routes =require('./routes/index.js')
var mongoose= require('mongoose')
const mongoURI = 'mongodb://localhost/email'
mongoose.connect(mongoURI)
///for viewing request.body/////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(methodOverride('_method'));
////for using the index.html file for diplays///////////
app.use(express.static(__dirname + '/angular'));
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

//	background-image:url("./css/background.jpg");
