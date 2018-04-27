angular.module('angular').controller('sendMailController', function($scope,$http, $window, $parse){
    $scope.email={
      to:'',
      from:$window.sessionStorage.getItem('userId'),
      subject:'',
      message:'',
      status:'Unread',
      date:'',
      time:''
    }
    $scope.file
    if($window.sessionStorage.getItem('to')!=undefined || $window.sessionStorage.getItem('subject')!=undefined || $window.sessionStorage.getItem('subject')!=undefined)
    {
        $scope.email.to=$window.sessionStorage.getItem('to')
        $scope.email.subject=$window.sessionStorage.getItem('subject')
        $scope.email.message=$window.sessionStorage.getItem('message')
    }
      $scope.upload= function(){
        var fd = new FormData();
        var files = document.getElementById('file').files[0];
        fd.append('file',files);
        $http({
         method: 'POST',
         url: '/Upload',
         data: fd,
         headers: {'Content-Type': undefined},
        }).then(function successCallback(response) { 

        });
      }  
      $scope.send= function(){
        if($scope.email.to===$window.sessionStorage.getItem('userId')){
          alert("You cant send mail to your self ")
        }
        else{
          var time = new Date()
          $scope.email.date=time.getDate().toString()+'-'+(time.getMonth()+1).toString()+'-'+time.getFullYear().toString()
          $scope.email.time=time.getHours().toString()+':'+time.getMinutes()
          socket.emit('email',$scope.email)
          console.log($scope.file)
          $scope.email={
            to:'',
            from:$window.sessionStorage.getItem('userId'),
            subject:'',
            message:'',
            status:'Unread',
            date:'',
            time:''
          }
        }
 
      }
 })
 