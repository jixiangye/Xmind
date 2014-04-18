define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	require('uijs');
	require('../css_img/api.css');
	
	angular
		.module("app-api",["utils","common"]);
	
	angular.bootstrap(document,["app-api"]);
	
	exports.run = function(){
		console.log("ok");
	};
});
