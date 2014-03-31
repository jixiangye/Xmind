define(function(require,exports,module){
	require('bootstrapcss');
	require('jquery');
	require('bootstrapjs');
	require('angular');
	exports.run = function(){
		console.log($,angular);
	};
});