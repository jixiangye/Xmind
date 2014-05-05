define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	require('uijs');
	require('acejs');
	require('../css_img/note.css');
	
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/markdown");
	
	angular
		.module("app-note",["utils","common"]);
	
	angular.bootstrap(document,["app-note"]);
});