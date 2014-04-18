define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	require('uijs');
	require('../css_img/index.css');
	
	angular
		.module("app-index",["utils","common"]);
	
	angular.bootstrap(document,["app-index"]);
	
	exports.run = function(){
		console.log("ok");
	};
});
