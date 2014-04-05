define(function(require,exports,module){
	require('bootstrapcss');
	require('bootstrapjs');
	require('angular');
	
	angular
		.module("todo",[])
		.controller("todoList",function($scope,$element){
			
			$scope.todos = [];
			
			$scope.addTodo = function(){
				$scope.todos.unshift({text:$scope.text,createDate:new Date});
				$scope.text = "";
			};
			
			$scope.removeTodo = function($index){
				$scope.todos.splice($index,1);
			};
			
			$scope.todoKeyDown = function($event){
				if($event.keyCode === 13){
					$scope.addTodo();
				}
			};
		});
	
	exports.run = function(){
// 		console.log($,angular);
	};
});
