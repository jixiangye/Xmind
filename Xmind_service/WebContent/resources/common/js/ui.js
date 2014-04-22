/**
 * 公共模块：ui
 */
define(function(require,exports,module){
	
	angular
		.module("ui",[])
		/**
		 * @param options{
		 * 		type:String "warning", "info", "danager", "success"(default)
		 * 		title:String,
		 * 		content:String
		 * }
		 */
		.factory("prompt",['$timeout',function($timeout){
			var template = function(obj){
					var className = "alert-success";
					switch(obj.type){
						case "info":
							className = "alert-info";
							break;
						case "warning":
							className = "alert-warning";
							break;
						case "danger":
							className = "alert-danger";
							break;
					}
					
					return "<div>" +
							"<div class='alert "+className+" animate-enter' ng-animate=\"'animate'\">"+
								"<strong>"+(obj.title||"")+"</strong>"+obj.content+
							"</div>" +
							"</div>";
				},
				queue = [],
				queueCount = 0,
				showQueue = [],
				addSpan = 2000,
				removeSpan = 3000,
				max = 2,
				action = function(){
					var hasQueue = queue.length,
						opt;

					opt = queue.shift();
					hasQueue && queueCount++;
					
					if(opt){
						var $item = angular.element(template(opt));
						box.append($item);
						
						hasQueue && $timeout(function(){
							action();
						},addSpan);
						
						showQueue.push($timeout(function(){
							$item.addClass('animate-leave');
							$timeout(function(){
								$item.remove();
							},600);
							showQueue.shift();
							showQueue.length || $timeout(function(){box.hide();},600);
						},removeSpan));
					}else{
						return;
					}
				},
				box = angular.element("<div class='prompt-box'></div>");
			
			return function(options){
				
				if(!angular.element(".prompt-box").length){
					angular.element("body").append(box);
				}
				
				if(!queue.length){
					box.show();
					queue.push(options);
					action();
				}else{
					queue.push(options);
				}
			};
		}])
		/**
		 * 
		 */
		.directive("timepicker",[function(){
			return {
				restrict:"AE",
				replace:true,
				scope:{
					
				},
				controller:function($scope,$element){
					var KEY = {
							UP:38,
							DOWN:40
						};
					var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
						updateDays = function(){
							var monthLen = month[1],
								months = new Array(monthLen);
							for(var i=0,len=monthLen;i<len;i++){
								months[i] = i+1;
							}
							$scope.days = months;
						};
					
					$scope.weeks = ["日","一","二","三","四","五","六"];
					$scope.days = [];
					updateDays();
					
					//up和down 键修改时间
					$scope.updateTime = function($event,m){
						var e = $event,
							target = e.target,
							value = target.value,
							max = m;
						
						value = +value||0;
						
						if(e.keyCode === KEY.UP){
							value++;
						}else if(e.keyCode === KEY.DOWN){
							value--;
						}
						
						if(value > max){
							value = "00";
						}else if(value < 0){
							value = max;
						}
						
						//一位数字自动补零
						if((""+value).length === 1)
							value = "0" + value;
							
						target.value = value;
					};
				},
				templateUrl:"../../../common/html/timepicker.html"
			};
		}]); 
});
