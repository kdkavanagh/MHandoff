define([], function(){

    var UndoStack = function() {
        this.stack = new Array();
    };
    
    UndoStack.prototype.push = function(obj, doFnName) {
    	if(doFnName) {
    		obj[doFnName]();
    	}
        this.stack.push(obj);
    };
    
    UndoStack.prototype.undo = function(undoFnName) {
    	var obj = this.stack.pop();
    	if(obj == undefined) {
    		return null;
    	}
    	if(undoFnName) {
    		obj[undoFnName]();
    	}
        return obj;
    };
    
    UndoStack.prototype.empty = function() {
    	this.stack = new Array();
    }
    
    return UndoStack;
});