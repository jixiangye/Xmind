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
					
					return "<div class='alert "+className+" animate-enter' ng-animate=\"'animate'\">"+
								"<strong>"+(obj.title||"")+"</strong>"+obj.content+
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
		}]); 
});