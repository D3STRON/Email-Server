angular.module('angular').controller('loginController',function($scope,$window ,$http, $location){
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
            if(response.data.success==false)
            {
              alert("User exists with some other password!")
            }
            else{
              $window.sessionStorage.setItem("userId",response.data.userId)
              $location.path('/MainPage')
            }
         })
    }
  })