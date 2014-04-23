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
		.directive("timepicker",['dateFilter',function(dateFilter){
			return {
				restrict:"AE",
				replace:true,
				scope:{
					reminderDate:"=reminderTime"
				},
				controller:function($scope,$element){
					var KEY = {
							UP:38,
							DOWN:40
						},
						hIpt = $element.find(".aui-left-ipt .aui-tpk-time-ipt"),
						mIpt = $element.find(".aui-right-ipt .aui-tpk-time-ipt"),
						dateBody = $element.find(".aui-tpk-body");
						
					var now = function(){
							var date = new Date();
							return {
								day:date.getDate(),
								week:date.getDay(),
								month:date.getMonth(),
								year:date.getFullYear(),
								hour:date.getHours(),
								minute:date.getMinutes()
							};
						},
						date = now(),
						calender = {
							months:[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
					        d:date.day,
					        w:date.week,
					        m:date.month,
					        y:date.year,
					        lastIndex:0,
					        render:function(y,m,w,d){
					        	var startI = w-d%7,
					              mA = this.months,
					              day = 0,
					              days = [],
					              active,
					              t;
					          startI<0 && (startI = startI+7) || (startI===7 && (startI = 0));
					          startI===6 && (startI = -1);
					          this.lastIndex = startI+d;
					          
					          for(var i=0,len=startI+mA[m];i<=len;i++){
					            if(i<=startI){
					            	days.push(0);
					            }else if(i<=startI+mA[m]){
					            	days.push(day = i-startI);
					            	day===date.day && m===date.month && y===date.year && (t = day);
					            	i === this.lastIndex && (active = day);
					            }
					          }
					          
					          return {
					        	  today:t,
					        	  active:active,
					        	  month:m+1,
					        	  year:y,
					        	  days:days
					          };
					        },
					        getAnyDate : function(y,m,d){
					            var date,
					                that = this,
					                mA = that.months;
					            y&&(that.y = y);
					            m != undefined&&(that.m = m);
					            d != undefined&&(that.d = d);
					            leapYear(that.y);
					            while(that.m>11){
					              that.m = that.m-12;
					              leapYear(++that.y);
					            }
					            while(that.m<0){
					              that.m = that.m+12;
					              leapYear(--that.y);
					            }
					            while(that.d>mA[that.m]){
					              that.m++;
					              that.m>11&&(that.m = that.m-12,leapYear(++that.y));
					              that.d = that.d - mA[that.m?that.m-1:11];
					            }
					            while(that.d<1){
					              that.m--;
					              that.m<0&&(that.m = that.m+12,leapYear(--that.y));
					              that.d = that.d + mA[that.m];
					            }
					            date = new Date(that.y,that.m,that.d);
					            while(date.getDate() !== that.d){
					              date = new Date(that.y,that.m,--that.d);
					            }
					            lastIndex = that.d;
					            that.w = date.getDay();
					            return that.render(that.y,that.m,that.w,that.d);
					            function leapYear(c){
					              c%4===0?mA[1]=29:mA[1]=28;
					            }
					          },
					          lastWeek : function(){
					            return this.getAnyDate(null,null,this.d-7);
					          },
					          nextWeek : function(){
					            return this.getAnyDate(null,null,this.d+7);
					          },
					          lastMonth : function(){
					            return this.getAnyDate(null,--this.m,null);
					          },
					          nextMonth : function(){
					            return this.getAnyDate(null,++this.m,null);
					          },
					          lastYear : function(){
					            return this.getAnyDate(--this.y);
					          },
					          nextYear : function(){
					            return this.getAnyDate(++this.y);
					          },
					          goToday : function(){
					            this.d = date.today;
					            this.y = date.year;
					            this.m = date.month;
					            this.w = date.week;
					            return this.render(year,month,week,today);
					          },
					          getDate : function(){
					            return {y:this.y,m:this.m+1,d:this.d,w:(this.w||7)};
					          }
						},
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
							return str+"00";
						};
					
					$scope.weeks = ["日","一","二","三","四","五","六"];
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
						today:dateFilter(new Date(date.year,date.month,date.day),"yyyy-MM-dd"),
						tomorrow:dateFilter(new Date(date.year,date.month,date.day+1),"yyyy-MM-dd"),
						nextWeek:dateFilter(new Date(date.year,date.month,date.day+7),"yyyy-MM-dd"),
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
					
					//打开时间选择器
					$scope.openTimepicker = function(){
						var hour = now().hour+1;
						$scope.date.hour = hour>23 ? "00" : hour;
						$scope.date.minute = "00";
						$element.find(".aui-timepicker").show();
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
							dateBody.find(".active").removeClass("active");
							angular.element(e.target).addClass("active");
							$scope.date.day = e.target.textContent;
							$scope.reminderDate = format($scope.date);
							$element.find(".aui-timepicker").hide();
						}
					};
					
					//快速选择日期
					$scope.quckSelectDate = function(e){
						if(e.target.tagName === "SPAN"){
							var span = angular.element(e.target); 
							angular.element(".label-info").removeClass("label-info");
							$scope.reminderDate = span.addClass("label-info").data("date")+" "+$scope.date.hour+":"+$scope.date.minute+":00";
							$element.find(".aui-timepicker").hide();
						}
					};
				},
				templateUrl:"../../../common/html/timepicker.html"
			};
		}]); 
});
