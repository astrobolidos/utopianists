var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone', 'moment'], function(){
    hmh.api.meetingModel = Backbone.Model.extend({
        url: 'http://172.17.2.8:8090/api/meeting'
    });
});

