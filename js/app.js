
requirejs.config({
    noGlobal: true,
    baseUrl: 'js',
    paths: {
        jquery		: 'lib/jquery-1.11.0.min',
        jqueryUI    : 'lib/jquery-ui',
        qunit		: 'lib/qunit-1.13.0',
        underscore	: 'lib/underscore-min',
        backbone	: 'lib/backbone-min',
        bootstrap	: 'lib/bootstrap.min',
        moment		: 'lib/moment.min',
        apiview		: 'backbone/api-view',

        // Student Assignments
        assignmentview		: 'backbone/assignment-view',
        assignmentitem		: 'backbone/assignment-item',
        assignmentmodel		: 'backbone/assignment-model',
        assignmentcollection: 'backbone/assignment-collection',
        teacherassignmentmodel : 'backbone/teacher-assignment-model',
        teacherassignmentcollection : 'backbone/teacher-assignment-collection',
        teacherassignmentitem : 'backbone/assignment-item',
        meetingView : 'backbone/meetingView'
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

require(["bootstrap", 'backbone', 'apiview'], function ($) {
    var options = {
        container: 'body',
        title: "Effective Meetings : Room Locator Pro",
        collection: [],
        countries : ['Ireland', 'US']
    };

    new hmh.api.view(options);
});