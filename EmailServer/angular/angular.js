var app = angular.module('angular',["ngRoute"])
var socket=io.connect('http://localhost:8000/')
//http://localhost:8000/
//http://help.localtunnel.me/
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
 .otherwise({
  redirectTo: '/login'
});
  $locationProvider.html5Mode({
    enabled: true,
   requireBase: false
  });
}]);







