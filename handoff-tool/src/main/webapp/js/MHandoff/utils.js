define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
  var getTodaysDate = function(plusDays) {
      var today = new Date();
      var dd = today.getDate()+plusDays;
      var mm = today.getMonth()+1; //January is 0!

      var yyyy = today.getFullYear();
      if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = mm+'/'+dd+'/'+yyyy;
      return today;
  };
  
  var checkLength = function() {
      this.showing = new Array();
  }

  checkLength.prototype.check = function() {
      //Check to see if we need the "more" text
      var that = this;
      $('.noteTextArea').each(function (index) {
          var article = $(this);
          var theP = article.find('p');
          var theMore = article.find('.more');
          //Attach a popover to theMore
          if(theP[0].scrollHeight >= $(this).height()) {
              theMore.show();
              that.showing[index] = true;
          } else {
              if (!article.hasClass('active')) {
                  theMore.hide();

                  that.showing[index] = false;
              } else {
                  that.showing[index] = false;

              }
          }
          theMore.text(that.showing[index] ? "More..." : "Less...");
      });
  };

  return {
    getTodaysDate: getTodaysDate,
    checkLength:checkLength
  };
});