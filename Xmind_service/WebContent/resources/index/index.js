define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	
	angular
		.module("app-index",["utils"])
		.controller("loginAndRegister",['$scope','$ajax',function($scope,$ajax){
			var URL = {
					LOGIN:"login/login",
					REGISTER:"login/register"
				};
			
			$scope.doLogin = function(){
				var data = {username:$scope.loginUserName,password:$scope.loginPW};
				$ajax({url:URL.LOGIN,data:data,method:"post"})
				.success(function(data){
					
				})
				.fali(function(data){
					
				});
			};
			
			$scope.doRegister = function(){
				var data = {username:$scope.regUserName,password:$scope.regPW,email:$scope.regEmail};
				$ajax({url:URL.REGISTER,data:data,method:"post"})
				.success(function(data){
					
				})
				.fail(function(data){
					
				});
			};
		}]);
	
	exports.run = function(){
		console.log("ok");
	};
});