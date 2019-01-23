app.controller('sendMailController', function($scope,$http, $window){
    $scope.email={
      to:'',
      from:$window.sessionStorage.getItem('userId'),
      subject:'',
      message:'',
      attachment: '',
      status:'Unread',
      date:'',
      time:''
    }
    $scope.fileStatus = 'No files attached'
    $scope.customer = {}
    if($window.sessionStorage.getItem('subject')!=='')
    {
        $scope.email.to=$window.sessionStorage.getItem('to')
        $scope.email.subject=$window.sessionStorage.getItem('subject')
        $scope.email.message=$window.sessionStorage.getItem('message')
        $scope.email.attachment=$window.sessionStorage.getItem('attachment')
        $scope.fileStatus = 'File attached'
    }

    $scope.$on("$locationChangeStart", function(){
       if($scope.email.attachment!== '')
       {
         $scope.unload()
       }
  });

    $scope.viewAttachment = function()
    {
      $window.open('http://localhost:8080/Upload'+'?filename='+$scope.email.attachment);
    }

    $scope.unload = function(){
      if($scope.customer.file === undefined){
            $scope.fileStatus = 'No files attached'
            $scope.email.attachment = ''
            $scope.customer = {}
      }
      else{
          $http({
          method:'POST',
          url:'/Unload',
          data: {fileName: $scope.email.attachment},
          headers: {'Content-type':'application/json'}
          }).then(function(res){
            $scope.fileStatus = 'No files attached'
            $scope.email.attachment = ''
            $scope.customer = {}
          })
      } 
    }
    
    $scope.upload = function(){
      if($scope.customer.file !== undefined)
      {
        $scope.fileStatus = 'File attached'
        var fd= new FormData()
        for( var key in $scope.customer)
        {
          fd.append(key,$scope.customer[key])
        }
        $http.post('/Upload',fd,{
          transformRequest: angular.identity,
          headers: {'Content-type':undefined}
        }).then(function(res){
          $scope.email.attachment = res.data
          console.log($scope.email.attachment)
        })
      }
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
                attachment:'',
                status:'Unread',
                date:'',
                time:''
              }
              $scope.fileStatus = 'No files attached'
              $scope.customer = {}
        }
      }
 })
 
