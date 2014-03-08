define([
        'jquery',
        'backbone',
        ], function($,Backbone){
    var Stream = function () {
        _.extend(this, Backbone.Events);
    };
    
    Stream.prototype.connect =function() {
        var self = this;
        
        if ("WebSocket" in window) {
            var url= "wss://" + window.location.host+"/streaming";
            this.socket = new WebSocket(url);
            console.log("Connecting to steam "+url);

            this.socket.onopen = function(e) {
                self.trigger('open', e);
                console.log('Stream opened');
            };

            this.socket.onerror = function(e) {
                self.trigger('error', e);
            };

            this.socket.onmessage = function(e) {
                    var jsonData = JSON.parse(e.data);
                    self.trigger('pushMessage', jsonData);
                    console.log("Received message on topic "+jsonData.topic);
                    if(jsonData.topic) {
                        var topic = jsonData.topic;
                        delete jsonData.topic;
                        self.trigger(topic, jsonData.message);
                    }
            };

            this.socket.onclose = function(e) {
                self.trigger('close', e);
                console.log('Stream closed');
            };
        } else {
            console.log("Websockets not supported by this browser");
        }
    };

    Stream.prototype.close = function() {
        this.socket.close();
    };
    
    Stream.prototype.subscribe = function(object, event, callback) {
        console.log("Subscription to "+event+" received");        
        object.listenTo(this, event, callback);
    };
    
    Stream.prototype.unsubscribe = function(object, event) {
        object.stopListening(this, event);
    };
    
    var streamObj = new Stream();

    return streamObj;
});