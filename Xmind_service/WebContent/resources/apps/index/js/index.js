define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	require('commoncss');
	require('../css_img/index.css');
	
	angular
		.module("app-index",["utils","common"]);
	
	exports.run = function(){
		console.log("ok");
	};
});
