define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	require('uijs');
	require('../css_img/index.css');
	
	angular
		.module("app-index",["utils","common"])
		.value('URL',{
			GET_LIST:"note/getNotes",
		})
		.factory('init',["xajax","URL",function(xajax,URL){
			return function($scope){
				//初始化todo列表
				xajax({url:URL.GET_LIST,method:"post",data:{}})
				.success(function(d){
//					var list = todos;
					angular.forEach(d.noteList,function(v,k){
//						v.old = v.content;
//						addTimer(v);
//						list[v.status == 1 ? 0 : (v.status||1)].list.push(v);
//					
//					$scope.todos = list;
					var a = $("<div>");
					a.html("<div class='col-md-8'>"+ v +"</div>");
					$("#todoHistory").append(a);
					});
				});
			};
		}])
		.factory("Index",["xajax","URL",function(xajax,URL){
		}])
		.controller("todoList",["$scope","init",function($scope,init){
			init();
		}]);
	angular.bootstrap(document,["app-index"]);
	
	exports.run = function(){
//		console.log("ok");
	};
});
