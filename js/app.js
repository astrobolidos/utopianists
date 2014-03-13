
requirejs.config({
	noGlobal: true,
    baseUrl: 'js',
    paths: {
        jquery		: 'lib/jquery-1.11.0.min',
        qunit		: 'lib/qunit-1.13.0',
    	underscore	: 'lib/underscore-min',
		backbone	: 'lib/backbone-min',
		bootstrap	: 'lib/bootstrap.min',
		moment		: 'lib/moment.min',
		calendar	: 'lib/calendar',
		apiview		: 'backbone/api-view',
		endpointview: 'backbone/endpoint-view',
		pingview 	: 'backbone/ping-view',
		testview 	: 'backbone/test-view',
		
		// Student Assignments
		assignmentview		: 'backbone/assignment-view',
		assignmentitem		: 'backbone/assignment-item',
		assignmentmodel		: 'backbone/assignment-model',
		assignmentcollection: 'backbone/assignment-collection',
		
		// Teacher Assignments
		teacherassignmentmodel		: 'backbone/teacher-assignment-model',
		teacherassignmentcollection : 'backbone/teacher-assignment-collection',

		dueview				: 'backbone/due-view',
		calendarview		: 'backbone/calendar-view',

        //utopianists
        meetingView : 'backbone/meetingView',
    },
    
    shim: {       
        "calendar": {
            deps: ["jquery", "underscore"]
        },        
        "bootstrap": {
            deps: ["jquery"]
        },
        "backbone": {
            deps: ["underscore"]
        }
    }
});

require(["bootstrap", 'backbone', 'apiview', 'meetingView'], function ($) {
	var options = {
            container: 'body',
            title: "Hmh Api Tester",
            collection: [],
    		endpoints : [
    		             '/api/assignment/v1/teacherAssignments', 
    		             '/api/assignment/v1/studentAssignments',
    		             '/api/assignment/v1/activities']
        };		
	 
	//new hmh.api.view(options);
    new hmh.api.meetingView(options);
});