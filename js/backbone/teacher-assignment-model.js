var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone', 'moment'], function(){
    hmh.api.teacherAssignmentModel = Backbone.Model.extend({

        defaults: {
            title:"Newly-created Assignment",
            preamble:"Newly-created Preamble",
            ownerId:"34a4e902-3264-48ca-9fc5-a13d9c5a1327",
            creatorId:"79c80cc2-73c7-40c3-99a0-b332e8865ae0",
            status:"NOT_STARTED",

            type:"TODO_TYPE_1",
            dueDate:"2014-02-12",
            availableDate:"2014-02-05"
        },

        idAttribute: 'refId',

        availableDate : function() {
            return moment(this.attributes.availableDate);
        }


    });
});