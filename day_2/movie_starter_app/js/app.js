//http://omdbapi.com/?t=frozen
//
var app = angular.module("movieApp", []);


app.directive("moviesDirective", function() {
  console.log('directive');
  return {
    templateUrl: 'templates/movies.html',
    controller: 'moviesCtrl',
    restrict: 'A' // A = attribute , E = element, C = class
  };
});




app.controller('moviesCtrl', function($scope, $http) {
  console.log('yay controller');
  $scope.movie = {};

  var fetchMovie = function(search) {
    $http.get('http://omdbapi.com/?t=' + search)
    .success(function(movie) {
       $scope.movie = movie;
       console.log('got ', movie);
       // showMovie;
       console.log('has property title? ', $scope.movie.hasOwnProperty('Title'));
    })
    .error(function() {
      alert('couldnt find movie ' + search);
    });
  };

  $scope.search  = function() {
    console.log('searching for ', $scope.searchQuery);
    //hideSearch();
    fetchMovie($scope.searchQuery);
  };


});
