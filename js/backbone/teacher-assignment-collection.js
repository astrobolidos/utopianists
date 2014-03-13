var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone', 'teacherassignmentmodel'], function(){



    hmh.api.teacherAssignmentCollection = Backbone.Collection.extend({
        model: hmh.api.teacherAssignmentModel,
        url: '/api/assignment/v1/teacherAssignments',

        comparator : function(model) {
            return model.get('dueDate');
        },

        fetch : function(){
            var collection = this;

            var model = new hmh.api.teacherAssignmentModel();

            collection.add(model);


        }
    })
});