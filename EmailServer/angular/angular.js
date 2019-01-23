var app = angular.module('angular',["ngRoute"])
var socket=io.connect(local)
var local='http://localhost:8000/'
const fileserver='http://192.168.1.104:8080/'
app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
   $routeProvider.when('/login',{
      templateUrl: './views/LoginPage.html',
      controller: 'loginController'
  })
  .when('/MainPage',{
     templateUrl: './views/MainPage.html',
     controller: 'mainPageController'
 })
 .when('/mySentMails',{
   templateUrl: './views/MySentMails.html',
   controller:  'mySentMailsController'
 })
 .when('/SendMail',{
   templateUrl: './views/SendMailPage.html',
   controller: 'sendMailController'
 })
 
  $locationProvider.html5Mode({
    enabled: true,
   requireBase: false
  });
}]);







