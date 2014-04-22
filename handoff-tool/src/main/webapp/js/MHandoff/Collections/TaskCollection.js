define([
        'jquery',     
        'underscore', 
        'backbone',
        'Models/Task',
        'Collections/NoteCollection'
        ], function($, _, Backbone, Task,  NoteCollection){

    var TaskCollection = NoteCollection.extend({
        model:Task,
        itemType:"task"
    });

    return TaskCollection;
});