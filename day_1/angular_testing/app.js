var app = angular.module("myApp", ["ngRoute", 'ngAnimate', 'ngResource']);


app.directive("testDirective", function() {
  return {
    templateUrl: 'templates/directives/test-dir.html',
    controller: 'directiveCtrl'
  };
});










// shared with anything inside 'myApp'
app.factory('testFactory', function() {
  var factory = {};

  factory.helloWorld = function() {
    alert('Hello world ');
  };

  return factory;
});


// app.factory('User', function($http) {
  // factory = {};
  // factory.getAll = function() {
    // // return a promise; controller code must resolve the promise
    // return $http.get("http://daretodiscover.herokuapp.com/users");
  // };

  // factory.save = function(user) {
    // return $http.post("http://daretodiscover.herokuapp.com/users", user);
  // };

  // return factory;
// });

app.factory('User', function($resource) {
  return $resource('http://daretodiscover.herokuapp.com/users/:id',
                   { id: '@id'},
                   {
                      update: { method: 'PUT' }
                   }
  );
});

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/page1", {
            templateUrl: "templates/page1.html",
            controller: "testCtrl"
        })
        .when("/page2/:id", {
          templateUrl: "templates/page2.html",
          controller: 'test2Ctrl'
        })
        .otherwise({
            redirectTo: "/page1"
        });
}]);

// this controller is tied to our new DIRECTIVE above
app.controller("directiveCtrl", function($scope) {
  $scope.sayHello = function() {
    alert('hello');
  }
});



app.controller("testCtrl", function($scope, testFactory, User) {
  $scope.userText = "hello world";

 testFactory.helloWorld();

  var getUsers = function() {
    // promises
    // User.getAll()
      // .success( function(users) {
        // console.log(users);
        // $scope.users = users;
      // })
      // .error( function() {
        // alert('error getting users');
      // });
    User.query(function(users) {
      $scope.users = users;
    }, function() {
      alert("error getting users");
    });

  };
  $scope.x = 300;
  $scope.y = 200;

  $scope.users = [
    { firstname: 'Bob',
      lastname: 'Jones',
      age: 20,
      username: 'bjones'
    },
    {
      firstname: 'john',
      lastname: 'smith',
      age: 23,
      username: 'jsmith'
    }
  ];


  $scope.submitUser = function(first, last, age, username) {
    // $scope.users.push( { firstname: first,
                          // lastname: last,
                          // age: age,
                          // username: username
    // });

    console.log($scope.userData);

    // User.save($scope.userData)
      // .success( function(user) {
        // //console.log('users', user);
        // //$scope.users.push(user);
        // getUsers();
      // })
      // .error( function() {
        // alert('oh no!  submit failed');
      // });
    User.save($scope.userData, function() {
      getUsers();
    }, function() {
      alert("error!");
    });
    // resource also makes this possible
    // var newUser = new User($scope.userData);
    // newUser.save();

  };

  // on instantiation:
  getUsers();

});



app.controller("test2Ctrl", function($scope, $routeParams) {
  $scope.memoText = "Feel free to write a memo";
  $scope.id = $routeParams.id;
});


