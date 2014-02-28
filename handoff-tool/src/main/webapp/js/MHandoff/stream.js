define([
        'jquery',
        'backbone',
        ], function($,Backbone){
    var Stream = function (feedName) {
        _.extend(this, Backbone.Events);
        var self = this;
        this.feedName = feedName;

        self.socket = new WebSocket("wss://" + window.location.host+"/noteStream");
        console.log("Using a standard websocket");

        self.socket.onopen = function(e) {
            self.trigger('open', e);
            console.log('socket opened');
            self.socket.send(self.feedName);
        };

        self.socket.onerror = function(e) {
            self.trigger('error', e);
        };

        self.socket.onmessage = function(e) {
            self.trigger('newNote', JSON.parse(e.data));
        };

        self.socket.onclose = function(e) {
            self.trigger('close', e);
            console.log('socket closed');
        };
    };

    return Stream;
});