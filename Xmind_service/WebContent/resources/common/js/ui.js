/**
 * 公共模块：ui
 */
define(function(require,exports,module){
    require('angular');
    
	angular
		.module("ui",[])
		/**
		 * @param options{
		 * 		type:String "warning",String "info",String "danager",String "success"(default),
		 * 		title:String,
		 * 		content:String
		 * }
		 */
		.factory("prompt",function(){
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
				
				return "<div class='alert "+className+"'>"+
							"<strong>"+(obj.title||"")+"</strong>"+obj.content+
						"</div>";
			};
			
			return function(options){
				var $box = angular.element("<div class='prompt-box'></div>");
				angular.element("body").append($box.append(template(options)));
				setTimeout(function(){
					$box.remove();
				},3000);
			};
		}); 
});