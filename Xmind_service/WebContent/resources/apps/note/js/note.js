define(function(require,exports,module){
	require('../css_img/note.css');
	require('bootstrapjs');
	require('commonjs');
	require('uijs');
	require('acejs');
	require('showdownjs');
	require('./mode.js');
	
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setAutoScrollEditorIntoView(true);
    
    (function(box){
    	var html = "";
    	for(var n in aceMode){
    		html += "<option value='"+n+"' "+(n==="markdown"?"selected":"")+">"+n+"</option>";
    	}
    	box.html(html);
    	
    	box.change(function(){
    		editor.getSession().setMode("ace/mode/"+$(this).val());
    	});
    	
    	box.change();
    })(angular.element(".mode-select"));
    
	angular
		.module("app-note",["utils","common"])
		.factory("Notepad",["xajax",function(xajax){
			var Notepad = {};
			
			Notepad.save = function(){
				
			};
			
			Notepad.del = function(){
				
			};
			
			Notepad.query = function(){
				
			};
		}])
		.factory("Document",["xajax",function(xajax){
			var Document = {};
			
			Document.save = function(){
				
			};
			
			Document.del = function(){
				
			};
			
			Document.queryNode = function(){
				
			};
			
			Document.queryContent = function(){
				
			};
		}])
		.controller("note",["$scope",function($scope){
			$scope.status={
				edit:true,
				list:false,
				addNoteBook:false
			};
			$scope.noteBooks = [];
			$scope.notes = [];
			$scope.snippets = [];
			$scope.note = {
				type:"markdown"
			};
			
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
		    
		    var converter;
		    $scope.changeToView = function(){
		    	if($scope.note.type === "markdown" && $scope.note.content){
		    		if(!converter)
		    			converter = new Showdown.converter();
		    		
		    		angular.element(".note-view").html(converter.makeHtml($scope.note.content));
		    	}
		    };
		}]);
	
	angular.bootstrap(document,["app-note"]);
});