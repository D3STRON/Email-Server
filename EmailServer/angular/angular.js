var app = angular.module('angular',["ngRoute"])
<<<<<<< HEAD
var socket=io.connect('http://localhost:8000/')
=======
var socket=io.connect('http://bingo.localtunnel.me/')
>>>>>>> 2eb6b50701bae95fa0a3b765fcbde83cecc402a6
app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
   $routeProvider.when('/login',{
      templateUrl: './views/LoginPage.html',
      controller: 'loginController'
  })
  .when('/MainPage',{
     templateUrl: './views/MainPage.html',
     controller: 'mainPageController'
 })
<<<<<<< HEAD
 .when('/mySentMails',{
   templateUrl: './views/MySentMails.html',
   controller:  'mySentMailsController'
 })
=======
>>>>>>> 2eb6b50701bae95fa0a3b765fcbde83cecc402a6
 .when('/SendMail',{
   templateUrl: './views/SendMailPage.html',
   controller: 'sendMailController'
 })
  $locationProvider.html5Mode({
    enabled: true,
   requireBase: false
  });
}]);

app.controller('loginController',function($scope,$window ,$http, $location){
  $scope.data={userId:'', password:'',
               emails:{sent_email:[],
                       recieved_email:[]
                      }
              }
  if($window.sessionStorage.getItem('userid')!=undefined)
  {
    $location.path('/mainPage')
  }
  $scope.login= function(){
    $http({
       method:'POST',
       url:'/login',
       data: $scope.data,
       headers: {'Content-type':'application/json'}
       }).then(function(response){
          $window.sessionStorage.setItem("userId",response.data.userId)
          $location.path('/MainPage')
       })
  }
})

app.controller('mainPageController',function($scope,$window,$http,$location){
$scope.data={userId:$window.sessionStorage.getItem('userId')}
<<<<<<< HEAD
=======
$scope.semails=[]
>>>>>>> 2eb6b50701bae95fa0a3b765fcbde83cecc402a6
$scope.remails=[]
  if($window.sessionStorage.getItem('userId')==undefined)
  {
    $location.path('/login')
  }else{
    $http({
       method:'POST',
       url:'/MainPage',
       data: $scope.data,
       headers: {'Content-type':'application/json'}
       }).then(function(res){
         $window.sessionStorage.setItem('to',"")
<<<<<<< HEAD
=======
          $scope.semails=res.data.sent_emails
>>>>>>> 2eb6b50701bae95fa0a3b765fcbde83cecc402a6
          $scope.remails=res.data.recieved_email
       })
  }




       socket.on('email',function(data){
         console.log(data)
         if(data.to===$window.sessionStorage.getItem('userId')){
           $scope.remails.push(data)
           $scope.$apply()
         }

       })
     $scope.reply=function(event)
     {
       $window.sessionStorage.setItem("to",$scope.remails[event.target.id].from)
       $location.path('/SendMail')
     }
    $scope.view= function(event){
         //console.log($scope.remails.length-event.target.id-1)
         $scope.indx=$scope.remails.length-event.target.id-1
        $scope.remails[$scope.indx].viewMessage=$scope.remails[$scope.indx].message
        if($scope.remails[$scope.indx].status==="Unread"){
        $scope.remails[$scope.indx].status="Read"
        $http({
           method:'POST',
           url:'/changeViewStatus',
           data: {index:$scope.indx, userId:$window.sessionStorage.getItem('userId')},
           headers: {'Content-type':'application/json'}
           }).then(function(res){

           })
         }
    }
    $scope.hide= function(event){
      $scope.indx=$scope.remails.length-event.target.id-1
      $scope.remails[$scope.indx].viewMessage=""
    }

    $scope.logout= function(){
    $window.sessionStorage.clear();
    $location.path('/login')
   }
   $scope.compose = function(){
     $location.path('/SendMail')
   }
<<<<<<< HEAD
   $scope.sent_emails= function()
   {
      $location.path('/mySentMails')
   }

=======
>>>>>>> 2eb6b50701bae95fa0a3b765fcbde83cecc402a6
})

app.controller('sendMailController', function($scope,$http, $window){
   $scope.email={
     to:'',
     from:$window.sessionStorage.getItem('userId'),
     subject:'',
     message:'',
     status:'Unread'
   }
   if($window.sessionStorage.getItem('to')!=undefined)
   {
       $scope.email.to=$window.sessionStorage.getItem('to')
   }
     $scope.send= function(){
       if($scope.email.to===$window.sessionStorage.getItem('userId')){
         alert("You cant send mail yo your self ")
       }
       else{
         socket.emit('email',$scope.email)
         $scope.email={
           to:'',
           from:$window.sessionStorage.getItem('userId'),
           subject:'',
           message:'',
           status:'Unread'
         }
       }

     }
})
<<<<<<< HEAD


app.controller('mySentMailsController',function($scope,$window,$location, $http){
   $scope.data={userId:$window.sessionStorage.getItem('userId')}
   $scope.semails=[]
   $http({
   method:'POST',
   url:'/MainPage',
   data: $scope.data,
   headers: {'Content-type':'application/json'}
   }).then(function(res){
      $scope.semails=res.data.sent_email
      console.log($scope.semails)
   })
})
=======
>>>>>>> 2eb6b50701bae95fa0a3b765fcbde83cecc402a6
