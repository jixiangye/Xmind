define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	require('uijs');
	require('../css_img/todo.css');
	
	angular
		.module("app-todo",["utils","common","ui"])
		.value('URL',{
			SAVE_TODO:"note/save",
			GET_LIST:"note/getNotes",
			GET_DETAIL:"note/getNotesHistory",
			DELETE_TODO:"note/delete",
			SAVE_TAG:"tag/save",
			GET_TAGS:"tag/query",
			SAVE_RELATION:"tag/saveRelation",
			DELETE_RELATION:"tag/deleteRelation"
		})
		.value('randomColor',function(){
			var random = function(){
				return Math.ceil(Math.random()*255);
			};
			return "rgb("+[random(),random(),random()].join(",")+")";
		})
		.value('dom',{
			todoPanel:angular.element(".todo-panel")
		})
		.value('todos',[
            {text:"待处理",status:2,list:[],color:"text-warning",expand:true},
            {text:"记事",status:1,list:[],color:"text-primary",expand:true},
            {text:"已完成",status:3,list:[],color:"text-success",expand:true},
            {text:"已关闭",status:4,list:[],color:"text-danger",expand:true}
		])
		.factory("addTimer",["timer","dateFilter","notice",function(timer,dateFilter,notice){
			return function addTimer(todo){
				if(todo.reminderTime){
					var remind = dateFilter(timer.formatter(todo.reminderTime),"yyyy-MM-dd"),
						now = dateFilter(new Date,"yyyy-MM-dd");
					
					//如果提醒时间在今天
					if(remind === now){
						//设置提醒
						timer(todo.reminderTime,function(todo){
							todo.reminderTime ="";
							console.log( n = notice.create(null,"事项提醒",todo.content));
							n.show();
						},[todo]);
					}
				}
			};
		}])
		.factory('init',["xajax","URL","todos","addTimer",function(xajax,URL,todos,addTimer){
			return function($scope){
				//初始化todo列表
				xajax({url:URL.GET_LIST,method:"post",data:{}})
				.success(function(d){
					angular.forEach(d.noteList,function(v,k){
						v.old = v.content;
						addTimer(v);
						$scope.todos[v.status == 2 ? 0 : (v.status == 1 ? 1 : v.status - 1)].list.push(v);
					});
				});
				
				//初始化标签
				xajax({url:URL.GET_TAGS,method:"post",data:{}})
				.success(function(d){
					$scope.tags = d.list;
				});
			};
		}])
		.factory("Todo",["xajax","URL","dom","prompt","addTimer",function(xajax,URL,dom,prompt,addTimer){
			var todo = {};
			
			function saveTodo(data,callback){
				xajax({url:URL.SAVE_TODO,data:data,method:"post"})
				.success(function(d){
					callback(d);
				});
			}
			
			todo.add = function($scope){
				var data = {content:$scope.content,status:1};
				if(!data.content){
					prompt({
						type:"warning",
						content:"请填写添加内容"
					});
					return;
				}

				if($scope.reminderTime){
					data.status = 2;
					data.reminderTime = $scope.reminderTime; 
				}
				
				saveTodo(data,function(d){
					var group = $scope.todos[d.status == 2 ? 0 : 1];

					if(!group.expand) group.expand = true;
					group.list.unshift(d);
					$scope.content = "";
					if($scope.reminderTime) $scope.reminderTime = "";
					if(d.reminderTime) addTimer(d);
				});
			};
			
			todo.update = function(todo,key,value){
				var data = {notesId:todo.notesId};
				
				data.content = todo.content;
				data.reminderTime = todo.reminderTime;
				data.status = todo.status;
				if(key){
					data[key] = value;
				}else{
					if(!data.content)
						return;
					if(todo.content === todo.old){
						prompt({
							type:"warning",
							content:"未做任何修改"
						});
						todo.editing = false;
						return;
					}else{
						todo.old = todo.content;
					}
				}
				
				if(key === "reminderTime" && !data.status){
					data.status = 1;
				}
				
				saveTodo(data,function(d){
					if(!key){
						//修改内容
						todo.editing = false;
					}else{
						//修改状态，或提醒时间
						todo[key] = value;
					}
				});
			};
			
			todo.del = function(todoGroup,notesId){
				var data = {},
					i;
				
				angular.forEach(todoGroup,function(v,k){
					if(v.notesId == notesId){
						data.notesId = notesId;
						i = k;
						return false;
					}
				});
				
				xajax({url:URL.DELETE_TODO,data:data,method:"post"})
				.success(function(d){
					todoGroup.splice(i,1);
				});
			};
			
			todo.detail = function($scope,todo){
				var data = {notesId:todo.notesId};
				
				xajax({url:URL.GET_DETAIL,data:data,method:"post"})
				.success(function(d){
					var historyGroup = [],
						last = "";
					
					$scope.historySpan = Math.floor(((new Date).getTime()-(new Date(d.noteHistoryList[d.noteHistoryList.length-1].modifyTime)).getTime())/(3600*1000*24));
					$scope.historySpan = $scope.historySpan ? $scope.historySpan+"天前":"今天";
					
					//整合历史数据
					angular.forEach(d.noteHistoryList.reverse(),function(v,k){
						v.changeContent = [];
						if(last && last.content !== v.content){
							v.changeContent.push("您将内容更新为："+v.content);
						}else if(!last){
							v.changeContent.push("您新增事项："+v.content);
						}
						if(last.status !== v.status){
							if(v.changeContent)
							switch(+v.status){
								case 1:
									v.changeContent.push("您将事项恢复为正常状态");
									break;
								case 2:
									v.changeContent.push("您添加提醒："+v.reminderTime);
									break;
								case 3:
									v.changeContent.push("您将事项标记为：完成");
									break;
								case 4:
									v.changeContent.push("您将事项标记为：关闭");
									break;
							}
						}
						
						var timeArray = v.modifyTime.split(" ");
						v.time = timeArray[1];
						v.date = timeArray[0];
						if(v.date === last.date){
							historyGroup[0].historyTodos.unshift(v);
						}else{
							historyGroup.unshift({time:v.date,historyTodos:[v]});
						}
						last = v;
					});
					
					$scope.historyGroup = historyGroup;
					$("#todo-history").modal("show");
				});
			};
			
			return todo;
		}])
		.factory("Tag",["xajax","URL","randomColor",function(xajax,URL,randomColor){
			var tag = {};
			
			tag.add = function($scope){
				var data = {
						tagName:$scope.tagName,
						tagColor:randomColor()
					};
				
				xajax({url:URL.SAVE_TAG,data:data,method:"post"})
				.success(function(d){
					$scope.tags.push(data);
					$scope.tagName = "";
				});
			};
			
			tag.del = function(){
				
			};
			
			tag.linkToTodo = function($scope,todo,xtag){
				var data = {notesId:todo.notesId,tagId:xtag.tagId},
					i = tag.inTag(todo.tags,xtag.tagId),
					tagColor = xtag.tagColor,
					type = i>-1 ? "d":"s",
					url = type === "d" ? URL.DELETE_RELATION : URL.SAVE_RELATION;
				
				xajax({url:url,data:data,method:"post"})
				.success(function(d){
					if(type === "d"){
						todo.tags.splice(i,1);
					}else{
						d.tagColor = tagColor;
						(todo.tags || (todo.tags=[])).push(d);
					}
				});
			};
			
			tag.inTag = function(tags,tagId){
				var i = -1;
				angular.forEach(tags,function(v,k){
					if(v.tagId === tagId){
						i = k;
						return false;
					}
				});
				return i;
			};
			
			return tag;
		}])
		.controller("todoList",["$scope","todos","init","Tag","prompt","notice","dom","Todo","$timeout",function($scope,todos,init,Tag,prompt,notice,dom,Todo,$timeout){
			$scope.todos = todos;
			$scope.historyGroup = [];//事项历史记录
			$scope.historySpan = "";//事项历史记录跨度
			$scope.todo = {};//todo
			$scope.tags = [];//标签
			$scope.reminderTime = "";//提醒时间
			$scope.operaing = false;
			
			init($scope);
			
			//监听登陆事件
			$scope.$on("login",function(){
				init($scope);
			});
			
			//监听登出事件
			$scope.$on("logout",function(){
				$scope.historyGroup = [];//事项历史记录
				$scope.historySpan = "";//事项历史记录跨度
				$scope.todo = {};//todo
				$scope.tags = [];//标签
				$scope.reminderTime = "";//提醒时间
				angular.forEach($scope.todos,function(v){
					v.list = [];
				});
			});
			
			$scope.noticeSupport = notice.support();
			
			//检查是否开启桌面通知
			if($scope.noticeSupport && notice.check() === 0){
				$scope.noticeAllowed = true;
			}else{
				if($scope.noticeSupport){
					notice.request();
				}
				$scope.noticeAllowed = false;
			}
			
			//开启/关闭桌面通知
			$scope.allowNotice = function(){
				notice.request();
			};
			
			//添加
			$scope.addTodo = function(){
				Todo.add($scope);
			};
			
			//回车添加
			$scope.todoKeyDown = function($event){
				if($event.keyCode === 13)
					Todo.add($scope);
			};
			
			//查看历史
			$scope.viewDetail = function(todo){
				Todo.detail($scope,todo);
			};
			
			//结束编辑
			$scope.editTodo = function($event,todo,key,value){
				Todo.update(todo,key,value);
			};
			
			//enter结束编辑
			$scope.editKeyDown = function($event,todo){
				if($event.keyCode === 13)
					$scope.endEdit($event,todo);
			};
			
			//删除todo
			$scope.deleteTodo = function(notesId){
				Todo.del($scope.todo.group.list,notesId);
			};
			
			var timer;
			//鼠标移入
			$scope.enterTodo = function($event,todo,todoGroup){
				var target = angular.element($event.target).closest("li");
				
				timer = $timeout(function(){
					$scope.todo = todo;
					$scope.todo.group = todoGroup;
					$scope.operaing = true;
					target.append(dom.todoPanel);
				},300);
			};
			
			//鼠标移出
			$scope.leaveTodo = function(){
				$scope.operaing = false;
				if(timer)
					$timeout.cancel(timer);
			};
			
			//添加标签
			$scope.addTag = function(){
				Tag.add($scope);
			};
			
			//enter添加标签
			$scope.tagKeyDown = function($event){
				if($event.keyCode === 13)
					Tag.add($scope);
			};
			
			//标签与todo关联/取消关联
			$scope.toggleTagToTodo = function(todo,xtag){
				Tag.linkToTodo($scope,todo,xtag);
			};
			
			//判断标签是否在todo的标签列表中
			$scope.inTags = function(tags,tagId){
				return Tag.inTag(tags,tagId);
			};
			
			var nowTimeObj = {};
			//打开时间选择器
			$scope.openTimepicker = function($event,time,obj){
				$scope.$parent.$broadcast('timepicker.open',$event,time);
				nowTimeObj = obj || $scope;
			};
			
			//
			$scope.$on("timepicker.select",function(event,time){
				nowTimeObj.reminderTime = time;
				if(nowTimeObj !== $scope){
					Todo.update(nowTimeObj,"reminderTime",time);
				}
			});
		}]);
	
	angular.bootstrap(document,["app-todo"]);
});
