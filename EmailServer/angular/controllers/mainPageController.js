app.controller('mainPageController',function($scope,$window,$http,$location){
    $scope.data={userId:$window.sessionStorage.getItem('userId')}
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
              $window.sessionStorage.setItem('message',"")
               $window.sessionStorage.setItem('subject',"")
               $window.sessionStorage.setItem('attachment',"")
              $scope.remails=res.data.recieved_email
           })
      }
    
    
        $scope.viewAttachment = function(event)
        {
          $scope.indx=$scope.remails.length-event.target.id-1
          // console.log($scope.remails[$scope.indx])
          $window.open('http://localhost:8080/Upload'+'?filename='+$scope.remails[$scope.indx].attachment)
        }
    
           socket.on('email',function(data){
             console.log(data)
             if(data.to===$window.sessionStorage.getItem('userId')){
               $scope.remails.push(data)
               $scope.$apply()
               //alert("You have a Mail!")
             }
    
           })
         $scope.reply=function(event)
         {
           $window.sessionStorage.setItem("to",$scope.remails[event.target.id].from)
           $location.path('/SendMail')
         }
    
         $scope.forward=function(event)
         {
           $scope.indx=$scope.remails.length-event.target.id-1
           $window.sessionStorage.setItem("subject",$scope.remails[$scope.indx].subject)
           $window.sessionStorage.setItem("message",$scope.remails[$scope.indx].message)
           $window.sessionStorage.setItem("attachment",$scope.remails[$scope.indx].attachment)
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
       $scope.sent_emails= function()
       {
          $location.path('/mySentMails')
       }
    
    })