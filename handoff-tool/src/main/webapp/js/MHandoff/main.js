//Filename: main.js

//Require.js allows us to configure shortcut alias
require.config({
    paths: {
        jquery: '../libs/jquery-2.1.0',
        underscore: '../libs/underscore',
        backbone: '../libs/backbone',
        bootstrap: '../libs/bootstrap.min',
        gridster: '../libs/gridster',
        gridster_ext: '../libs/gridster-ext',
        moment : '../libs/moment.min',
        bootstrap_editable : '../libs/bootstrap-editable.min',
        bootstrap_select : "../bootstrap-select.min",
        text:"../libs/text",
        domReady:"../libs/domReady",

    },

    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'bootstrap':{
            deps:['jquery'],
            exports:'Bootstrap'
        },
        "gridster": {
            deps:['jquery'],
            "exports": "Gridster"
        },
        "bootstrap_editable": {
            deps:['jquery', 'bootstrap'],
            exports: "Bootstrap_editable"
        }

    },

    
});

require([

         // Load our app module and pass it to our definition function
         'jquery',
         'underscore',
         'bootstrap',
         'bootstrap_editable',
         'MHandoff',
         'domReady',
         ], function($, _, Bootstrap, Bootstrap_editable, App, dom){

    dom(function () {
        //This function is called once the DOM is ready.
        //It will be safe to query the DOM and manipulate
        //DOM nodes in this function.
        console.log("Initializing MHandoff");
        App.initialize();
    });

});