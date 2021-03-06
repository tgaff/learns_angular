//http://omdbapi.com/?t=frozen
//
var app = angular.module("movieApp", []);

// borrowed from: http://stackoverflow.com/a/17364716/1760776
app.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        console.log(scope);
        console.log(attrs);
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter, {'event': event});
        });

        event.preventDefault();
      }
    });
  };
});



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
      console.log('got ', movie);
      console.log('has property title? ', $scope.movie.hasOwnProperty('Title'));

      if (movie.Error) {
        console.log('movie is error');
        $scope.searchQuery = '';
        $('#search-input-box').effect('shake');
      } else {
       $scope.movie = movie;
      }
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

  $scope.goBack = function() {
    $scope.searchQuery = '';
    $scope.movie = {};
  };
});
