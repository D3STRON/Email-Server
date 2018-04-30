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
    $scope.view= function(event)
    {
      $scope.indx=$scope.semails.length-event.target.id-1
      $scope.semails[$scope.indx].viewMessage=$scope.semails[$scope.indx].message
    }
    $scope.hide= function(event)
    {
      $scope.indx=$scope.semails.length-event.target.id-1
      $scope.semails[$scope.indx].viewMessage=""
    }
    $scope.mainpage= function()
    {
      $location.path('/MainPage')
    }
    $scope.logout= function()
    {
      $window.sessionStorage.clear()
      $location.path('/login')
    }
    $scope.compose= function()
    {
      $location.path('/SendMail')
    }
 })
 