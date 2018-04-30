app.controller('sendMailController', function($scope,$http, $window){
    $scope.email={
      to:'',
      from:$window.sessionStorage.getItem('userId'),
      subject:'',
      message:'',
      status:'Unread',
      date:'',
      time:''
    }
    $scope.customer = {}
    if($window.sessionStorage.getItem('to')!=undefined || $window.sessionStorage.getItem('subject')!=undefined || $window.sessionStorage.getItem('subject')!=undefined)
    {
        $scope.email.to=$window.sessionStorage.getItem('to')
        $scope.email.subject=$window.sessionStorage.getItem('subject')
        $scope.email.message=$window.sessionStorage.getItem('message')
    }
    $scope.upload = function(){
      //console.log($scope.customer)
      var fd= new FormData()
      for( var key in $scope.customer)
      {
        fd.append(key,$scope.customer[key])
      }
      $http.post('/Upload',fd,{
        transformRequest: angular.identity,
        headers: {'Content-type':undefined}
      })
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
 
