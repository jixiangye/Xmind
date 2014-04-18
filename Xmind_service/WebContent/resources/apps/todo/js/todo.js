define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	require('uijs');
	require('../css_img/todo.css');
	
	angular
		.module("app-todo",["utils","common","ui"])
		.controller("todoList",["$scope","$element","xajax","prompt",function($scope,$element,xajax,prompt){
			var URL = {
					ADD_TODO:"note/save",
					GET_LIST:"note/getNotes",
					GET_DETAIL:"note/getNotesHistory"
				},
				historyScope = angular.element(".todo-history-list").scope();
			
			
			xajax({url:URL.GET_LIST,method:"post",data:{}})
			.success(function(d){
				$scope.todos = d.noteList;
			});
			
			$scope.todos = [];
			$scope.historyTodos = [];
			
			$scope.addTodo = function(){
				var data = {content:$scope.content,reminderTime:new Date};
				xajax({url:URL.ADD_TODO,data:data,method:"post"})
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
				xajax({url:URL.GET_DETAIL,data:data,method:"post"})
				.success(function(d){
					$("#todo-history").modal("show");
					$scope.historyTodos = d.noteHistoryList;
				});
			};
			
			$scope.enterTodo = function($event){
				var target = angular.element($event.target),
					top = target.position().top+target.height()+20;
				
				target.addClass("active");
//				angular.element(".todo-panel").css({top:top});
			};
			
			$scope.leaveTodo = function($event){
				var target = angular.element($event.target);
				
				target.removeClass("active");
			};
		}]);
	
	angular.bootstrap(document,["app-todo"]);
	
	exports.run = function(){
// 		console.log($,angular);
	};
});
