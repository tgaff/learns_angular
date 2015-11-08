var app = angular.module("wineManager", ['ngRoute', 'ngAnimate', 'ngResource']);

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

app.factory('Wine', function($resource) {
  return $resource('http://daretodiscover.herokuapp.com/wines/:id',
                   { id: '@id'},
                   {  update: { method: 'PUT'} }
  );
});


app.controller("winesController", function($scope, Wine) {
  console.log('ok');
  var updateWines = function() {
      Wine.query(function(data) {
        $scope.wines = data;
      }, function() {
        alert('cant get the wines');
      })
  };


  $scope.createWine = function() {
    console.log($scope.newWine);
    Wine.save($scope.newWine, function(data) {
        console.log('received: ', data);
        updateWines();
      }, function() {
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
