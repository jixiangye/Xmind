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
				boxTimeout,
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
							if(!showQueue.length){
								boxTimeout = $timeout(function(){box.hide();boxTimeout=null;},600);
							}
						},removeSpan));
					}else{
						return;
					}
				},
				box = angular.element("<div class='prompt-box'></div>"),
				prompt = function(options){
					if(!angular.element(".prompt-box").length){
						angular.element("body").append(box);
					}
					
					if(!queue.length){
						if(boxTimeout){
							$timeout.cancel(boxTimeout);
							boxTimeout = null;
						}else{
							box.show();
						}
						queue.push(options);
						action();
					}else{
						queue.push(options);
					}
				};
			
			prompt.clear = function(){
				queue = [];
				while(showQueue.length){
					$timeout.cancel(showQueue.unshift());
				}
			};
				
			return prompt;
		}])
		/**
		 * 
		 */
		.factory("calender",['dateFilter',function(dateFilter){
			var now = new Date,
				date = {
					year:now.getFullYear(),
					month:now.getMonth(),
					week:now.getDay(),
					day:now.getDate(),
					hour:now.getHours(),
					minute:now.getMinutes(),
					second:now.getSeconds()
				},
				months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
				leapYear = function (c){
	              	return (c%4===0 && c%100!==0 || c%400===0)?true:false;
	            };
			
			var self = {
					y:date.year,
					m:date.month,
					w:date.week,
					d:date.day,
					now:date,
					weeks:["日","一","二","三","四","五","六"],
					months:months,
					render:function(){
						var y = self.y,
							m = self.m,
							w = self.w,
							d = self.d,
							start = w-d%7,
						    mA = months[m],
						    day = 0,
						    days = [],
						    inMonth = y === date.year && m === date.month,
						    t;
						
						m === 1 && leapYear(y) && (mA = 29);
						
						start<0 && (start = start+7) || (start===7 && (start = 0));
						start===6 && (start = -1);
	
						for(var i=0,len=start+mA;i<=len;i++){
							if(i<=start){
							    days.push(0);
							}else if(i<=start+mA){
							    days.push(day = i-start);
							    inMonth && day === date.day && (t = day);
							}
						}
	
						return {
						    today:t,
						    month:m+1,
						    active:d,
						    year:y,
						    days:days
						};
					},
					getAnyDate:function(y,m,d){
						var newDate = new Date(y||self.y,m||self.m,d||self.d);
						self.y = newDate.getFullYear();
						self.m = newDate.getMonth();
						self.w = newDate.getDay();
						self.d = newDate.getDate();
						return self.render();
					},
					lastWeek : function(){
						return self.getAnyDate(null,null,this.d-7);
					},
					nextWeek : function(){
						return self.getAnyDate(null,null,this.d+7);
					},
					lastMonth : function(){
						return self.getAnyDate(null,--this.m,null);
					},
					nextMonth : function(){
						return self.getAnyDate(null,++this.m,null);
					},
					lastYear : function(){
						return self.getAnyDate(--this.y);
					},
					nextYear : function(){
						return self.getAnyDate(++this.y);
					}
				};
			
			return self;
		}])
		.directive("timepicker",['dateFilter','calender',function(dateFilter,calender){
			return {
				restrict:"AE",
				replace:true,
				controller:function($scope,$element){
					var KEY = {
							UP:38,
							DOWN:40
						},
						hIpt = $element.find(".aui-left-ipt .aui-tpk-time-ipt"),
						mIpt = $element.find(".aui-right-ipt .aui-tpk-time-ipt"),
						dateBody = $element.find(".aui-tpk-body"),
						body = dateBody.closest("body");
						
					var now = calender.now,
						initDate = calender.getAnyDate(),
						updateCalender = function(date){
							$scope.today = date.today;
							$scope.activeDay = date.active;
							$scope.date.month = date.month;
							$scope.date.year = date.year;
							$scope.days = date.days;
						},
						format = function(date){
							var list = ["year","month","day","hour","minute"],
								item,
								split="-",
								str = "";
							for(var i=0,len=list.length;i<len;i++){
								split = i>1 ? i>2 ? i>3 ? "" : ":" : " " : "-";
								item = ""+date[list[i]];
								item = item ? item.length === 1?0+item:item:"00";
								str += item+split;
							}
							return str+":00";
						};
					
					$scope.weeks = calender.weeks;
					$scope.today = initDate.today;
					$scope.activeDay = initDate.active;
					$scope.date = {
						month:initDate.month,
						year:initDate.year,
						minute:"",
						hour:"",
					};
					$scope.days = initDate.days;
					$scope.quck = {
						today:dateFilter(new Date(now.year,now.month,now.day),"yyyy-MM-dd"),
						tomorrow:dateFilter(new Date(now.year,now.month,now.day+1),"yyyy-MM-dd"),
						nextWeek:dateFilter(new Date(now.year,now.month,now.day+7),"yyyy-MM-dd"),
					};
					
					//up和down 键修改时间
					$scope.updateTime = function(event,m,k){
						var e = event,
							target = e.target || (k === "h" ? hIpt:mIpt)[0],
							value = target.value,
							max = m;

						value = +value||0;
						if(k){
							if(e === "up"){
								value++;
							}else if(e === "down"){
								value--;
							}
						}else{
							if(e.keyCode === KEY.UP){
								value++;
							}else if(e.keyCode === KEY.DOWN){
								value--;
							}
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
						$scope.date[m==23?"hour":"minute"] = value;
					};
					
					//上个月
					$scope.lastMonth = function(){
						updateCalender(calender.lastMonth());
					};
					
					//下个月
					$scope.nextMonth = function(){
						updateCalender(calender.nextMonth());
					};
					
					//选择日期
					$scope.selectDate = function(e){
						if(e.target.tagName === "SPAN" && e.target.textContent !== ""){
							var time;
							dateBody.find(".active").removeClass("active");
							angular.element(e.target).addClass("active");
							$scope.date.day = e.target.textContent;
							time = format($scope.date);
							$element.hide();
							$scope.$parent.$broadcast("timepicker.select",time);
						}
					};
					
					//快速选择日期
					$scope.quckSelectDate = function(e){
						if(e.target.tagName === "SPAN"){
							var span = angular.element(e.target),
								time; 
							angular.element(".label.active").removeClass("active");
							time = span.addClass("active").data("date")+" "+$scope.date.hour+":"+$scope.date.minute+":00";
							$element.hide();
							$scope.$parent.$broadcast("timepicker.select",time);
						}
					};
					
					$scope.$on("timepicker.open",function(scope,$event,time){
						var $this = angular.element($event.currentTarget); 
						var rect = $this.offset();
						var hour = now.hour+1;
						$scope.date.hour = hour>23 ? "00" : hour;
						$scope.date.minute = "00";
						if(rect.left > body.width() - rect.left){
							$element.css({top:rect.top+$this.height(),left:rect.left-$element.width()});
						}else{
							$element.css({top:rect.top+$this.height(),left:rect.left});
						}
						
						$element.show();
						
						angular.element(document).on("mousedown.timepicker",function(){
							angular.element(document).off("mousedown.timepicker");
							$element.hide();
						});
					});
					
					$element.on("mousedown",function(){
						return false;
					});
				},
				templateUrl:"../../../common/html/timepicker.html"
			};
		}])
		
		.factory("msg",[function(){
			
			function msg(opts){
				return new msg.prototype._init(opts);
			}
			
			msg.prototype = {
				constructor:msg,
				_init:function(opts){
					var self = this;
					this.$head = angular.element("<div class='aui-msg-head clearfix'>");
					this.$title = angular.element("<span class='aui-msg-title'>");
					this.$con = angular.element("<div class='aui-msg-con'>");
					this.$box = angular.element("<div class='aui-msg-box'>");
					this.$close = angular.element("<button type='button' class='close'>×</button>");
					this.$modal = angular.element("<div class='aui-msg-modal'>");
					
					opts.title&&this.$title.html(opts.title);
					this.$head.append(this.$close).append(this.$title);
					this.$box.append(this.$head).append(this.$con);
					angular.element("body").append(this.$box).append(this.$modal);
					
					this.$close.on("click",function(){
						self.close();
					});
					
					return this;
				},
				options:function(){
					
				},
				close:function(){
					this.$box.add(this.$modal).hide();
				},
				open:function(){
					this.$box.add(this.$modal).show();
				},
				destory:function(){
					this.$box.remove();
					this.$modal.remove();
					this.$box = this.$modal = null;
				}
			};
			
			msg.prototype._init.prototype = msg.prototype;
			
			return msg;
		}]); 
});
