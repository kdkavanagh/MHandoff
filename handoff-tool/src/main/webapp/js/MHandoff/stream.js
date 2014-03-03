define([
        'jquery',
        'backbone',
        ], function($,Backbone){
    var Stream = function () {
        _.extend(this, Backbone.Events);
        var self = this;

        if ("WebSocket" in window) {
            this.socket = new WebSocket("wss://" + window.location.host+"/streaming");
            console.log("Using a standard websocket");

            this.socket.onopen = function(e) {
                self.trigger('open', e);
                console.log('socket opened');
            };

            this.socket.onerror = function(e) {
                self.trigger('error', e);
            };

            this.socket.onmessage = function(e) {
                    var jsonData = JSON.parse(e.data);
                    self.trigger('message', jsonData);
                    if(jsonData.topic) {
                        var topic = jsonData.topic;
                        delete jsonData.topic;
                        self.trigger(topic, jsonData.message);
                    }
            };

            this.socket.onclose = function(e) {
                self.trigger('close', e);
                console.log('socket closed');
            };
        } else {
            console.log("Websockets not supported by this browser");
        }
    };

    Stream.prototype.close = function() {
        this.socket.close();
    };

    return Stream;
});