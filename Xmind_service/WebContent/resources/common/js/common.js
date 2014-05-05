/**
 * 公共模块：utils
 * 公共模块：common
 */
define(function(require,exports,module){
    require("angular");
	
    angular
        .module("utils",["ui"])
        /**
         * @param config{
         * 	    其他参数同$http:http://docs.angularjs.org/api/ng/service/$http
         * 		errorHandler:"alert"警告,"prompt"提示（默认）,false不错处理
         * }
         */
        .factory("xajax",["$http","prompt",function($http,prompt){
            return function(config){
            	config.url = "../../../../"+config.url;
                var promise = $http(config);
                
                //handler error
                promise.then(function(response) {
                    if(!response.data.success){
                    	if(config.errorHandler === "alert"){
                    		
                    	}else if(config.errorHandler !== false){
                    		//default errorHandler is "prompt",false means don't handler with error
                    		angular.forEach(response.data.errorBeanList,function(n,v){
                    			prompt({
                    				type:"warning",
                    				content:n.errorMessage
                    			});
                    		});
                    	}
                    }
                });
                    
                promise.success = function(fn){
                    promise.then(function(response) {
                        if(response.data.success)
                            fn(response.data, response.status, response.headers, config);
                    });
                    return promise;
                };
                
                promise.fail = function(fn){
                    promise.then(function(response) {
                        if(!response.data.success){
                            fn(response.data, response.status, response.headers, config);
                        }
                    });
                    return promise;
                };
                
                promise.error = function(fn){
                    promise.then(null, function(response) {
                      fn(response.data, response.status, response.headers, config);
                    });
                    return promise;
                };
                
                return promise;
            };
        }])
        
        .factory("notice",function(){
        	var notice = {};
        	
        	notice.create = function(p,t,c){
        		//@param 图片，标题，描述信息
        		return window.webkitNotifications.createNotification(p,t,c);
        	};
        	
        	notice.check = function(){
        		return window.webkitNotifications.checkPermission();
        	};
        	
        	notice.request = function(callback){
        		window.webkitNotifications.requestPermission(callback);
        	};
        	
        	notice.support = function(){
        		return !!window.webkitNotifications;
        	};
        	
        	return notice;
        })
        
        /**
         * @param time<String> 时间字符串
         * @param callback<Function> 回调函数
         * @param args<Array or ArrayLike> 回调函数的参数
         * @param context<Object> 回调函数的执行上下文
         * @return Timer<Object> 计时对象
         */
        .factory("timer",function(){
        	function Timer(time,callback,args,context){
        		this.timer;
        		this.timerType = "timeout";
        		this.callback = callback;
        		this.args = args;
        		this.context = context;
        		this.run(time);
        	}
        	
        	Timer.prototype.stop = function(){
        		if(this.timerType === "timeout"){
        			clearTimeout(this.timer);
        		}else{
        			clearInterval(this.timer);
        		}
        	};
        	
        	Timer.prototype.run = function(time){
        		var now = (new Date).getTime(),
			        remind = fun.formatter(time).getTime(),
			        gap = (remind-now)/1000,
			        self = this,
			        f;
        		
        		self.timerType = "timeout";
			        
			    if(gap > 60*60){
			        f = 50*60;
			    }else if(gap > 10*60){
			        f = 8*60
			    }else if(gap > 60){
			        f = 40
			    }else if(gap > 0){
			    	self.timerType = "interval";
			    	self.timer = setInterval(function(){
		                if((new Date).getTime() >= fun.formatter(time).getTime()){
		                    self.callback.apply(self.context,self.args);
		                    self.stop();
		                }
		            },1000);
			        return;
			    }else{
			        return;
			    }
			    self.timer = setTimeout(function(){self.run(time);},f*1000);
        	};
        	
        	function fun(time,callback,args,context){
				return new Timer(time,callback,args,context);
			};
			
			fun.formatter = function(time){
			    var reg = /^(\d+)-(\d+)-(\d+)\s(\d+):(\d+):(\d+)/,
			        list = reg.exec(time),
			        date = new Date(list.slice(1,4));
			    date.setHours(list[4]);
			    date.setMinutes(list[5]);
			    date.setSeconds(list[6]);
			    return date;
			};
				
			return fun;
        });
    
    angular
    	.module("common",["utils","ui"])
    	.directive("publicheader",function(){
    		return {
    			restrict:"E",
    			templateUrl:"../../../common/html/header.html"
    		}
    	})
    	.controller("loginAndRegister",['$scope','xajax','$location','prompt',function($scope,xajax,$location,prompt){
			var URL = {
					LOGIN:"login/login",
					REGISTER:"login/register",
					GET_SESSION:"login/getSessionInfo",
					LOGIN_OUT:"login/logout"
				};
			
			$scope.tab = $location.absUrl().match(/(\w+)\.html/)[1];
			$scope.navHide = false;
			
			xajax({url:URL.GET_SESSION,method:"post"})
			.success(function(d){
				if(d.username){
					$scope.username = d.username;
				}
			});
			
			$scope.doLogin = function(){
				var data = $scope.login;

				if($scope.loginBox.$invalid)
					return;

				xajax({url:URL.LOGIN,data:data,method:"post"})
				.success(function(d){
					$scope.username = data.username;
					$('#login-box').modal('hide');
					prompt({
						type:"success",
						content:"登陆成功"
					});
					//广播登录 
					$scope.$parent.$broadcast("login");
				})
				.fail(function(data){

				});
			};

			$scope.doRegister = function(){
				var data = $scope.reg;

				if($scope.regBox.$invalid)
					return;

				xajax({url:URL.REGISTER,data:data,method:"post"})
				.success(function(data){
					$scope.username = data.username;
					$('#login-box').modal('hide');
					prompt({
						type:"success",
						title:"恭喜你",
						content:"注册成功"
					});
					//广播登陆
					$scope.$parent.$broadcast("login");
				})
				.fail(function(data){

				});
			};
			
			$scope.loginout = function(){
				xajax({url:URL.LOGIN_OUT,method:"post"})
				.success(function(d){
					$scope.logoutCallback && $scope.logoutCallback();
					$scope.username = "";
					//广播退出登录
					$scope.$parent.$broadcast("logout");
				})
				.fail(function(data){

				});
			};
		}]);
});
