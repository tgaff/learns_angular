var app = angular.module("todoApp", []);

app.controller("todosController", function($scope) {
  $scope.test = 'angular connected';

  $scope.todos = [
    { body: 'I want to go shopping', status: 'completed'},

    { body: 'Clean the house', status: 'incomplete' }
  ];

  $scope.toggleComplete = function(todo) {
    if (todo.status === 'completed') {
      todo.status = 'incomplete';
    }else {
      todo.status = 'completed';
    }
  };

  $scope.deleteTodo = function(todo) {
    console.log('delete');
    var index = $scope.todos.indexOf(todo);
    $scope.todos.splice(index, 1);
  };

  $scope.addTodo = function() {
    $scope.todos.push( { body: $scope.newTodoInput, status: 'incomplete' } );
  }
});

