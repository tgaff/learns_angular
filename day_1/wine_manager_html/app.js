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

app.factory('Wine', function($http) {
  var factory = {};

  factory.getAll = function() {
    return $http.get('http://daretodiscover.herokuapp.com/wines');
  }
  factory.save = function(wineData) {
    return $http.post('http://daretodiscover.herokuapp.com/wines', wineData);
  };

  factory.getOne = function(id) {
    return $http.get('http://daretodiscover.herokuapp.com/wines/' + id);
  };

  factory.update = function(id,wineData) {
    return $http.put('http://daretodiscover.herokuapp.com/wines/' + id, wineData);
  };
  return factory;
});




app.controller("winesController", function($scope, Wine) {
  console.log('ok');
  var updateWines = function() {
      Wine.getAll()
      .success(function(data) {
        $scope.wines = data;
      })
      .error(function() {
        alert('failed to retrieve data');
      });
  };


  $scope.createWine = function() {
    console.log($scope.newWine);
    Wine.save($scope.newWine)
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


app.controller("wineController", function($scope, $routeParams, $location, Wine) {

  $scope.wineID = $routeParams.id;
  var getWine = function() {
    console.log('getting wine ', $scope.wineID);
    Wine.getOne($scope.wineID)
      .success(function(wine) {
        $scope.wine = wine;
      })
      .error(function(data) {
        alert('failed to get wine with id ', $scope.wineID);
      });
  };

  $scope.updateWine = function() {
    console.log('updateWine()');
    Wine.update($scope.wineID, $scope.wine)
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
