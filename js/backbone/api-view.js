
var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone', 'endpointview', 'pingview', 'testview', 'assignmentview', 'dueview', 'calendarview'],function(){
	hmh.api.view = Backbone.View.extend({
	
		devEnv : false, // Is this a developer machine (i.e. localhost)
		
		el : 'body',	
	    events:{
	    	'click #ping'  : 'pingView',
	    	'click #tests' : 'testsView',	
	    	'click #poc'   : 'assignmentView',
	    	'click #due'   : 'dueView',
	    	'click #daily' : 'calendarView',
	    	'click #login' : 'authenticate',  	    	
	    	'click #login-submit' : 'authenticateProgress'
	    }, 
	    
		modalTemplate :
			'<div class="modal" id="modal">' +
				'<div class="modal-dialog">' +
				  '<div class="modal-content">' +				  
				    '<div class="modal-header">' +				    
				      '<button type="button" class="close" id="modal-close" aria-hidden="true">&times;</button>' +
				    '</div>' +
				    '<div class="modal-body" id="modal-body">' +

					    '<form id="login-form" class="form-inline" role="form">' +
						    '<div class="form-group">' +
						      '<label class="sr-only" for="login-name">Email address</label>' +
						      '<input type="login" id="login-name" class="form-control" placeholder="Username" value="testTeacher">' +
						    '</div>' +
						    '<div class="form-group">' +
						      '<label class="sr-only" for="id="login-password">Password</label>' +
						      '<input type="password" id="login-password" class="form-control" placeholder="Password" value="mypassw0rd">' +
						    '</div>' +
						    '<button id="login-submit" type="submit" class="btn btn-default">Login</button>' +
				    		'<div class="bs-callout bs-callout-warning">' +
				    			'<h4>You can sign in without a username or password.</h4>' +
					    	'</div>' +
						  '</form>' +
 
					    '<div id="login-progress" class="progress progress-striped active hidden">' +
						    '<div class="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">' +
						      '<span class="sr-only">100% Complete</span>' +
						    '</div>' +
						'</div>' +				 
				    '</div>' +
				    '<div class="modal-footer">' +
				      '<button type="button" class="btn btn-default" id="modal-closeBtn">Close</button>' +		      
				    '</div>' +			    
				  '</div>' +
				'</div>' +
			'</div>',
    
	    currentpage : {}, 

	    initialize:function (args) {
	    	
	    	var host = document.URL.match('://localhost');
	    	this.devEnv = host && host.length > 0;
	   
	    	_.extend(this, args);
	        _.bindAll(this, 'render', 'addEndpointView', 'removeView', 
	        				'pingView', 'testsView', 'assignmentView', 'dueView', 'calendarView',
	        				'authenticate', 'authenticateProgress', 'authenticated', 'error');  	        
	        this.render();     
	    },
	
	    render:function () {	
	    	
	       for(var index in this.endpoints){
	    	   var endpoint = $('<li></li>').append($('<a href="#">'+  this.endpoints[index] + '</a>'));    	   
			   endpoint.click(this.addEndpointView);
		       $('#api-endpoints').append(endpoint);
	       }  
	       this.authenticate();
	    },
	       
	    addEndpointView : function (e){
	    	
			var endpointName = $(e.currentTarget.firstChild).text();        			      
			this.removeView(this.currentpage);
			this.currentpage = new hmh.api.endpoint({
					el : $('#current-page'),
			    	endpoint : endpointName
			    });		
	    },
	    
	    removeView : function (view){
	    	
	    	if(view.el){
		    	view.undelegateEvents();
		    	view.el.empty();
				view.unbind();		
	    	}
	    },
	    
	    pingView: function(){
	    	
	    	this.removeView(this.currentpage);	    	
	    	this.currentpage = new hmh.api.pingview({
				el : $('#current-page'), 
				endpoints : this.endpoints
		    });	   	
	    },
	    
	    testsView: function(){
	    	
	    	this.removeView(this.currentpage);
	    	this.currentpage = new hmh.api.testview({
				el : $('#current-page')
		    });	
	    },

	    assignmentView: function(){
	    	
	    	this.removeView(this.currentpage);
	    	this.currentpage = new hmh.api.assignmentview({
				el : $('#current-page')
		    });	
	    },
	    
	    dueView: function(){
	    	
	    	this.removeView(this.currentpage);
	    	this.currentpage = new hmh.api.dueview({
				el : $('#current-page')
		    });	
	    },
	    
	    calendarView: function(){
	    	
	    	this.removeView(this.currentpage);
	    	this.currentpage = new hmh.api.calendarview({
				el : $('#current-page')
		    });	
	    },

	    authenticate : function(){   	

	    	$('body').append(_.template(this.modalTemplate));
	    	$('#modal').show(); 
	    	$('#modal-close').click(function(){$('#modal').hide()});
	    	$('#modal-closeBtn').click(function(){$('#modal').hide()});	
	    },
	        
	    authenticateProgress : function(event, data){   	

	    	event.preventDefault();       	
	    	$('#login-form').hide();
	    	$('#login-progress').removeClass('hidden');
	
	    	if(this.devEnv) {

		    	$.ajax({
		    		  url: 'getHmofToken',
		    		  type: 'GET',	 
		    		  data: { login : $('#login-name').val() , plaintextpassword : $('#login-password').val()}
		    		})
		    		.success(this.authenticated)	    		
		    	    .error(this.error);		    		    	
	    	} else {
	    		
		    	$.ajax({
		    		  url: '/api/identity/token',
		    		  type: 'POST',	 		  
		    		  data: { username : $('#login-name').val() , password : $('#login-password').val(), grant_type : 'password'}
		    		})
		    		.success(this.authenticated)	    		
		    	    .error(this.error); 	   
	    	}	    	
	    },	    
 
	        
	    authenticated : function(data, status, jqXHR){
	    	
	    	var authn = '';
	    	if(this.devEnv){
	    		// Fallback to using Hmof auth  
	    		authn = this.scrapeAuthResponse(data);
	    	}
	    	else {
	    		// use the identity token from the new service
	    		authn = document.cookie.split('=')[1];
	    	}
	    	
    		
	    	if(authn.split('.').length < 3){	
	    		this.error(null, "Expected JWT to have 3 segments separated by '.', but it has 1 segments: " +
	    						authn, null);
	    	}  else {
		    	$('#modal-body').empty().text('Authenticated');
	    	} 	
	    	
	    	document.cookie= 'Authn=' + authn;
  	
	    	// show all views that require an authenticated connection
			this.removeView(this.currentpage);
		    this.currentpage = new hmh.api.dueview({el : $('#current-page')});	
		    $('#poc').removeClass('hidden');
		    $('#due').removeClass('hidden');
		    $('#daily').removeClass('hidden');
	    },  
	    
	    error : function(data, status, jqXHR){
	    	
	    	$('#modal-body').empty();
	    	$('#modal-body').text("Failed to authenticate: " + status)
	    } ,
	    
	    scrapeAuthResponse : function (response){
	    	
	    	var Authn_index = 1;
	    	// Hack to pull the cookie from the return headers or page contents
	    	var results = response.match(/[A-Za-z0-9:._-]+/g);
	    	return results[Authn_index];	    		    	
	    }
	});
});
