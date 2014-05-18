define(function(require,exports,module){
	require('bootstrapjs');
	require('commonjs');
	require('uijs');
	require('acejs');
	require('showdownjs');
	require('../css_img/note.css');
	
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/markdown");
    editor.setAutoScrollEditorIntoView(true);
    
//    var converter = new Showdown.converter();
    
	angular
		.module("app-note",["utils","common"])
		.controller("note",["$scope",function($scope){
			$scope.status={
				edit:true,
				list:false,
				addNoteBook:false
			};
			$scope.noteBooks = [];
			$scope.notes = [];
			$scope.snippets = [];
			
			var timer;
		    editor.on("change",function(){
		    	if(timer){
		    		clearTimeout(timer);
		    	}
		    	timer = setTimeout(function(){
		    		$scope.note.content = editor.getValue();
		    	},300);
		    });
		    
		    
		    //添加记事本
		    $scope.addNoteBook = function($event){
		    	if($event.keyCode === 13){
			    	var book = {name:$scope.noteBookName};
			    	$scope.noteBooks.push(book);
			    	$scope.noteBookName = "";
			    	$scope.status.addNoteBook = false;
		    	}
		    };
		    
		    
		}]);
	
	angular.bootstrap(document,["app-note"]);
});