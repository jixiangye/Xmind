define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	require('./css_img/index.css');
	
	angular
		.module("app-index",["utils"])
		.controller("loginAndRegister",['$scope','$ajax','$log',function($scope,$ajax,$log){
			var URL = {
					LOGIN:"login/login",
					REGISTER:"login/register"
				};
			
			$scope.doLogin = function(){
				var data = $scope.login;
				
				if($scope.loginBox.$invalid)
					return;
				
				$ajax({url:URL.LOGIN,data:data,method:"post"})
				.success(function(data){
					
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
					
				})
				.fail(function(data){
					
				});
			};
		}]);
	
	exports.run = function(){
		console.log("ok");
	};
});
