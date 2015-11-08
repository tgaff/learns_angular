var app = angular.module("wineManager", ['ngRoute', 'ngAnimate']);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/index.html",
            controller: "winesController"
        })
        .when("/edit/:id", {
          templateUrl: "templates/edit.html",
          controller: 'wineController'
        })
        .otherwise({
            redirectTo: "/"
        });
}]);




app.controller("winesController", function($scope, $http) {
  console.log('ok');
  var updateWines = function() {
    $http.get('http://daretodiscover.herokuapp.com/wines')
      .success(function(data) {
        $scope.wines = data;
      })
      .error(function() {
        alert('failed to retrieve data');
      });
  };


  $scope.createWine = function() {
    console.log($scope.newWine);
    $http.post('http://daretodiscover.herokuapp.com/wines', $scope.newWine)
      .success(function(data) {
        console.log('received: ', data);
        updateWines();
      })
      .error(function(data) {
        alert('failed to save');
      });


  };
  // on initialization
  updateWines();

});


app.controller("wineController", function($scope, $http, $routeParams, $location) {

  $scope.wineID = $routeParams.id;
  var getWine = function() {
    console.log('getting wine ', $scope.wineID);
    $http.get('http://daretodiscover.herokuapp.com/wines/' + $scope.wineID)
      .success(function(wine) {
        $scope.wine = wine;
      })
      .error(function(data) {
        alert('failed to get wine with id ', $scope.wineID);
      });
  };

  $scope.updateWine = function() {
    console.log('updateWine()');
    $http.put('http://daretodiscover.herokuapp.com/wines/' + $scope.wineID, $scope.wine)
      .success(function(wine) {
        console.log('it worked');
        $location.path('/');

      })
      .error(function() {
        alert('failed to save');
      });
  };


  getWine();
});
