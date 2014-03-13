var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone', 'assignmentmodel'], function(){
	hmh.api.assignmentCollection = Backbone.Collection.extend({
	    model: hmh.api.assignmentModel,
	    url: '/api/assignment/v1/studentAssignments',

	    comparator : function(model) {
	        return model.get('dueDate');
	    }
	})
});