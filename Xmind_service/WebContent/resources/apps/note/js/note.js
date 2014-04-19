define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	require('uijs');
	require('../css_img/note.css');
	
	angular
		.module("app-note",["utils","common"]);
	
	angular.bootstrap(document,["app-note"]);
	
	exports.run = function(){
		console.log("ok");
	};
});
