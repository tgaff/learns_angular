var app = angular.module("myApp", []);

app.controller("testCtrl", function($scope, $http) {
  $scope.userText = "hello world";

  var getUsers = function() {
    // promises
    $http.get("http://daretodiscover.herokuapp.com/users")
      .success( function(users) {
        console.log(users);
        $scope.users = users;
      })
      .error( function() {
        alert('error getting users');
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

    $http.post("http://daretodiscover.herokuapp.com/users", $scope.userData)
      .success( function(user) {
        //console.log('users', user);
        //$scope.users.push(user);
        getUsers();
      })
      .error( function() {
        alert('oh no!  submit failed');
      });

  };

  // on instantiation:
  getUsers();

});
