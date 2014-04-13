/**
 * 公共模块：utils
 * 公共模块：common
 */
define(function(require,exports,module){
    require('angular');
    
    angular
        .module("utils",[])
        .factory("$ajax",["$http",function($http){
            return function(config){
            	config.url = "../../../../"+config.url;
                var promise = $http(config);
                    
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
        }]);
    
    angular
    	.module("common",["utils"])
    	.directive("publicheader",function(){
    		return {
    			restrict:"E",
    			templateUrl:"../../../common/html/header.html"
    		}
    	})
    	.controller("loginAndRegister",['$scope','$ajax','$location',function($scope,$ajax,$location){
			var URL = {
					LOGIN:"login/login",
					REGISTER:"login/register",
					GET_SESSION:"login/getSessionInfo",
					LOGIN_OUT:"login/logout"
				};
			
			$scope.tab = $location.absUrl().match(/(\w+)\.html/)[1];
			
			$ajax({url:URL.GET_SESSION,method:"post"})
			.success(function(d){
				if(d.username){
					$scope.username = d.username;
				}
			});
			
			$scope.doLogin = function(){
				var data = $scope.login;

				if($scope.loginBox.$invalid)
					return;

				$ajax({url:URL.LOGIN,data:data,method:"post"})
				.success(function(d){
					$scope.username = data.username;
					$('#login-box').modal('hide');
				})
				.fail(function(data){

				});
			};

			$scope.doRegister = function(){
				var data = $scope.reg;

				if($scope.regBox.$invalid)
					return;

				$ajax({url:URL.REGISTER,data:data,method:"post"})
				.success(function(data){
					$scope.username = data.username;
					$('#login-box').modal('hide');
				})
				.fail(function(data){

				});
			};
			
			$scope.loginout = function(){
				$ajax({url:URL.LOGIN_OUT,method:"post"})
				.success(function(d){
					$scope.username = "";
				})
				.fail(function(data){

				});
			};
		}]);
});