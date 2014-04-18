define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	require('uijs');
	
	angular
		.module("app-todo",["utils","common","ui"])
		.controller("todoList",["$scope","$element","$ajax","prompt",function($scope,$element,$ajax,prompt){
			var URL = {
					ADD_TODO:"note/save",
					GET_LIST:"note/getNotes",
					GET_DETAIL:"note/getNotesHistory"
				};
			
			$ajax({url:URL.GET_LIST,method:"post",data:{}})
			.success(function(d){
				$scope.todos = d.noteList;
			});
			
			$scope.todos = [];
			
			$scope.addTodo = function(){
				var data = {content:$scope.content,reminderTime:new Date};
				$ajax({url:URL.ADD_TODO,data:data,method:"post"})
				.success(function(d){
					$scope.todos.unshift(d);
					$scope.content = "";
				});
			};
			
			$scope.removeTodo = function($index){
				$scope.todos.splice($index,1);
			};
			
			$scope.todoKeyDown = function($event){
				if($event.keyCode === 13){
					$scope.addTodo();
				}
			};
			
			$scope.viewDetail = function($index){
				var data = {noteId:$scope.todos[$index].id};
				$ajax({url:URL.GET_DETAIL,data:data,method:"post"})
				.success(function(d){
					
				});
			};
		}]);
	
	angular.bootstrap(document,["app-todo"]);
	
	exports.run = function(){
// 		console.log($,angular);
	};
});
