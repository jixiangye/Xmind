define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	require('uijs');
	require('../css_img/todo.css');
	
	angular
		.module("app-todo",["utils","common","ui"])
		.controller("todoList",["$scope","$element","xajax","prompt",function($scope,$element,xajax,prompt){
			var URL = {
					SAVE_TODO:"note/save",
					GET_LIST:"note/getNotes",
					GET_DETAIL:"note/getNotesHistory"
				};
			
			//初始化todo列表
			xajax({url:URL.GET_LIST,method:"post",data:{}})
			.success(function(d){
				$scope.todos = d.noteList;
			});
			
			$scope.todos = [];
			$scope.historyGroup = [];
			$scope.historySpan = "";
			
			//添加
			$scope.addTodo = function(){
				var data = {content:$scope.content,reminderTime:new Date};
				saveTodo(data);
			};
			
			function saveTodo(data){
				xajax({url:URL.SAVE_TODO,data:data,method:"post"})
				.success(function(d){
					$scope.todos.unshift(d);
					$scope.content = "";
				});
			}
			
			//关闭
			$scope.removeTodo = function($index){
				$scope.todos.splice($index,1);
			};
			
			//回车添加
			$scope.todoKeyDown = function($event){
				if($event.keyCode === 13){
					$scope.addTodo();
				}
			};
			
			//查看历史
			$scope.viewDetail = function($index){
				var data = {noteId:$scope.todos[$index].id};
				xajax({url:URL.GET_DETAIL,data:data,method:"post"})
				.success(function(d){
					var historyGroup = [],
						lastModifyTime = "";
					
					$scope.historySpan = Math.floor(((new Date).getTime()-(new Date(d.noteHistoryList[0].modifyTime)).getTime())/(3600*1000*24));
					
					angular.forEach(d.noteHistoryList,function(v,k){
						if(v.modifyTime === lastModifyTime){
							historyGroup[0].historyTodos.unshift(v);
						}else{
							lastModifyTime = v.modifyTime;
							historyGroup.unshift({time:v.modifyTime,historyTodos:[v]});
						}
					});
					
					$scope.historyGroup = historyGroup;
					$("#todo-history").modal("show");
				});
			};
			
			//编辑内容
			$scope.editTodo = function(todo){
				todo.editing = true;
			};
			
			//结束编辑
			$scope.endEdit = function($event,todo){
				var data = {noteId:todo.id,content:todo.content};
				
				if(!data.content)
					return;
				
				xajax({url:URL.SAVE_TODO,data:data,method:"post"})
				.success(function(d){
					todo.editing = false;
				});
			};
			
			//回车结束编辑
			$scope.editKeyDown = function($event,todo){
				if($event.keyCode === 13){
					$scope.endEdit($event,todo);
				}
			};
			
			//鼠标移入
			$scope.enterTodo = function($event){
				var target = angular.element($event.target),
					top = target.position().top+target.height()+20;
				
				target.addClass("active");
//				angular.element(".todo-panel").css({top:top});
			};
			
			//鼠标移出
			$scope.leaveTodo = function($event){
				var target = angular.element($event.target);
				
				target.removeClass("active");
			};
		}]);
	
	angular.bootstrap(document,["app-todo"]);
});
