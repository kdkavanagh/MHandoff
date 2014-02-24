// Filename: main.js

// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    jquery: '../libs/jquery-2.1.0',
    underscore: '../libs/underscore',
    backbone: '../libs/backbone',
    bootstrap: '../libs/bootstrap.min',
    gridster: '../libs/gridster',
    gridster_ext: '../libs/gridster-ext',
    moment : '../libs/moment.min',
    wysihtml5 : '../libs/wysihtml5-0.3.0.min',
    bootstrap_editable : '../libs/bootstrap-editable.min',
    bootstrap_select : "../bootstrap-select.min",
    text:"../libs/text",
        
  }

});

require([

  // Load our app module and pass it to our definition function
  'jquery',
  'underscore',
  'bootstrap',
  'bootstrap_editable',
  'MHandoff',
], function($, _, Bootstrap, Bootstrap_editable, App){
  // The "app" dependency is passed in as "App"

    console.log("Initializing MHandoff");
   App.initialize();
});