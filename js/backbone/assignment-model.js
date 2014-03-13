var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone'], function(){
	hmh.api.assignmentModel = Backbone.Model.extend({
	
	    defaults: { 
	    	title:"Newly-created TeacherAssignment",
			preamble:"Newly-created Preamble0",
			ownerId:"34a4e902-3264-48ca-9fc5-a13d9c5a1327",
			creatorId:"79c80cc2-73c7-40c3-99a0-b332e8865ae0",
			status:"NOT_STARTED",
			type:"TODO_TYPE_1",
			dueDate:"2014-02-12",
			availableDate:"2014-02-05"	
	    },
	    
	    idAttribute: 'refId'	    
	});
});