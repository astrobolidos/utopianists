var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone', 'moment'], function(){
    hmh.api.meetingModel = Backbone.Model.extend({
        url: 'http://172.17.2.8:8090/api/meeting',

        default: {
            "$id": "1",
            "meetingId": 3,
            "roomId": 3,
            "beginTime": "2014-03-13T14:24:08.877",
            "endTime": "2014-03-13T15:24:08.877"
        }
    });
});

