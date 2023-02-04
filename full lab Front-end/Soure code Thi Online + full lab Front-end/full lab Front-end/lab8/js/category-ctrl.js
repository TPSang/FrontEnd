app.controller("categoryCtrl", function ($scope, $routeParams)
{
    $scope.listQuizs = [];
    var b = $routeParams.id;

    console.log(b);
    $http.get("db/Quizs/"+b+".js").then(function(response){
      $scope.listQuizs = response.data;
      $scope.summark = ((Math.ceil($scope.listQuizs.length / 1) - 1) * 1);
      
     
    });
});