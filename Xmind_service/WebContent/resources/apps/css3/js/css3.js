define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	require('uijs');
	require('../css_img/api.css');
	
	angular
		.module("app-css3",["utils","common"]);
	
	angular.bootstrap(document,["app-css3"]);
	
	exports.run = function(){
		console.log("ok");
	};
});
