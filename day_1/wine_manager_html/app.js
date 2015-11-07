var app = angular.module("wineManager", []);

app.controller("winesController", function($scope, $http) {

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
