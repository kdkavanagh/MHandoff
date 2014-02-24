$(function() {

    function getTodaysDate(plusDays) {
        var today = new Date();
        var dd = today.getDate()+plusDays;
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;
        return today;
    }
    
    window.MHandoff = {};
    window.MHandoff.Models = {};
    window.MHandoff.Collections = {};
    window.MHandoff.Views = {};

    MHandoff.Models.Note = Backbone.Model.extend({
        url:"",
        defaults : {
            noteId : "0",
            priority :"1",
            reporter:"N/A",
            reportedDate:getTodaysDate(0),
            expiration:getTodaysDate(1),
            badgeLevel:"",
            text:"Note text",
        },
    });
    
    MHandoff.Collections.NoteCollection = Backbone.Collection.extend({
        model : MHandoff.Models.Note,
        url : '/patient/items.do?type=note',
    });
    
    MHandoff.Views.root = Backbone.View.extend({
        
        initialize: function () {

            console.log("Initializing MHandoff");
           
        },
        
        render : function() {
            var view = new MHandoff.Views.NoteGridView();  
        },
    });
    
    var rootView = new MHandoff.Views.root();

});
