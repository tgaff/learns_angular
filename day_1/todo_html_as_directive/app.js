var app = angular.module("todoApp", []);

app.controller("todosController", function($scope) {
  $scope.test = 'angular connected';

  $scope.initialize = function() {
    var stored = JSON.parse(localStorage.getItem('todos'));
    if (stored) {
      $scope.todos = stored;
    }else {
      $scope.todos = [
        { body: 'I want to go shopping', status: 'completed'},

        { body: 'Clean the house', status: 'incomplete' }
      ];
    }
  };

  $scope.todos = [];

  $scope.toggleComplete = function(todo) {
    if (todo.status === 'completed') {
      todo.status = 'incomplete';
    }else {
      todo.status = 'completed';
    }
    $scope.persist();
  };

  $scope.deleteTodo = function(event, todo) {
    event.preventDefault();
    console.log('delete');
    var index = $scope.todos.indexOf(todo);
    $scope.todos.splice(index, 1);
    $scope.persist();
  };

  $scope.addTodo = function() {
    $scope.todos.push( { body: $scope.newTodoInput, status: 'incomplete' } );
    $scope.persist();
  }

  $scope.persist = function() {
    console.log('SAVE');
    localStorage.clear();
    console.log($scope.todos);
    localStorage.setItem('todos', angular.toJson($scope.todos));
  };


  $scope.initialize();
  $scope.persist();
});

