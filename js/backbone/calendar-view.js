var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone', 'calendar', 'moment', 'assignmentmodel','assignmentcollection','assignmentitem'],function(){
	hmh.api.calendarview = Backbone.View.extend({
			
	    events:{},    
	    collection : {},
		dateFormat : 'YYYY-MM-DDTHH:mm:ss',
		
	    template :
    	'<div class="row col-lg-offset-1 col-lg-9">' +
	    	'<ul class="nav nav-tabs" id="calendarTab">' +
	    	  '<li class="active"><a id="day-tab" href="#day">Day</a></li>' +
	    	  '<li><a href="#week"id="week-tab">Week</a></li>' +
	    	  '<li><a href="#month"id="month-tab">Month</a></li>' +
	    	'</ul>' +
	    	'<div class="tab-content">' +
	    	  '<div class="tab-pane active  fade in" id="day">' +
	    	  	'<div id="daily-tab-contents"></div>'+
	    	  '</div>' +
	    	  '<div class="tab-pane fade" id="week">'+
	    	  	'<div id="weekCalendar"></div>' +
	    	  '</div>' + 
	    	  '<div class="tab-pane fade" id="month">' +
	    	  		'<div id="monthCalendar"></div>' +
	    	  '</div>' + 
	    	'</div>' +
    	'</div>',
    	
    	overdue : 	'<div class="bs-callout bs-callout-danger">' +
		    			'<h4>Overdue</h4>' +
			    	    '<p id="yesterday">Late Assignments</p>' +
			    	'</div>',
    		
    	today : '<div class="bs-callout bs-callout-warning">' +
					'<h4>Today</h4>' +
		    	    '<p id="today">Today\'s Assignments</p>' +
		    	'</div>',
		    	
    	next:	'<div class="bs-callout bs-callout-info">' +
					'<h4>Due Next</h4>' +
		    	    '<p id="tomorrow">Next Assignments</p>' +
		    	'</div>',
    	
	    initialize:function (args) {	 
	    	
	    	_.extend(this, args);
	    	_.bindAll(this, 'render', 'renderDay', 'renderWeek', 'renderMonth', 
	    					'renderDayResults', 'renderAssignment','assignmentsToEvents');    
	    	this.render();
	    },
	    
	    render:function (args) {
	    	
	    	 var self = this;

	    	 this.el.append(_.template(this.template));
	    	 self.renderDay();	    	 
	    	 
	    	 $('#day-tab').click(function (e) {
	    		  e.preventDefault()
	    		  $(this).tab('show');
	    		  self.renderDay();
	    	});

	    	 $('#week-tab').click(function (e) {
	    		  e.preventDefault()
	    		  $(this).tab('show');
	    		  self.renderWeek();
	    	});

	    	 $('#month-tab').click(function (e) {
	    		  e.preventDefault()
	    		  $(this).tab('show');
	    		  self.renderMonth();
	    	});
	    },	
	
		renderDay : function (){
			$('#daily-tab-contents').empty();
	    	$('#daily-tab-contents').append(_.template(this.overdue));
	    	$('#daily-tab-contents').append(_.template(this.today));
	    	$('#daily-tab-contents').append(_.template(this.next));
	    	
	    	$('#daily-tab-contents p:first').append(_.template(this.overdue));	
	    	
	    	
	        var yesterday_params = {
	        		  'from': moment().hours(-24).format(this.dateFormat),
	        		  'to':  moment().format(this.dateFormat),
	        		  'offset': '0',
	        		  'pagesize': '1'
	        		};    
	        
	        var today_params = {
	        		  'from':  moment().format(this.dateFormat),
	        		  'to': moment().hours(24).format(this.dateFormat),
	        		  'offset': '0',
	        		  'pagesize': '1'
	        		};  
	        
	        var tomorrow_params = {
	        		  'from':  moment().hours(24).format(this.dateFormat),
	        		  'to': moment().hours(48).format(this.dateFormat),
	        		  'offset': '0',
	        		  'pagesize': '1'
	        		};       
        
	        
	        this.collection = new hmh.api.assignmentCollection();	
	        this.collection.day = "today";
	        this.collection.bind("reset", this.renderDayResults);
	        this.collection.fetch({
	        	success : this.renderDayResults,
	        	data: today_params
	        	}); 
	        
	        this.collection = new hmh.api.assignmentCollection();	
	        this.collection.day = "yesterday";
	        this.collection.bind("reset", this.renderDayResults);
	        this.collection.fetch({
	        	success : this.renderDayResults,
	        	data: yesterday_params
	        	}); 
  
	        this.tomorrowCollection = new hmh.api.assignmentCollection();	
	        this.tomorrowCollection.day = "tomorrow";
	        this.tomorrowCollection.bind("reset", this.renderDayResults);
	        this.tomorrowCollection.fetch({
	        	success : this.renderDayResults,
	        	error : this.error,
	        	data: tomorrow_params
	        	}); 

	    },
	    
	    renderDayResults:function (collection) {

	    	$('#' + collection.day ).empty(); 
	    	collection.sort();
	    	this.renderAssignment(collection.models[0]); 	    	
	    },
	    
	    renderAssignment:function (model) {
	    	var item = new hmh.api.assignmentItem({model : model});
	    	$(item.render()).appendTo($('#' + model.collection.day)).show();
	    },
	    
	    
	    error : function (collection, xhr){
	    	
	    	this.$el.empty();
	    	this.$el.append('<div class="alert alert-danger">Assignments connection : '
	    			+ xhr.status + ' ' 
	    			+ xhr.statusText + '</div>');	    		    	
	    },	

		renderWeek : function (){
			
			if(!this.weekCalendar){
				var self = this;
				this.weekCalendar = $('#weekCalendar').calendar({
					    events_source: self.assignmentsToEvents(this.collection),
				 		view : 'week'
				 });
			}
		},
		
		renderMonth : function (){
			
			if(!this.monthCalendar){
				var self = this;
				this.monthCalendar = $('#monthCalendar').calendar({
		   		    events_source: self.assignmentsToEvents(this.collection),
		   		    view : 'month'
			   	 }
				);
			   	 
			   	$('.cal-cell').unbind();
			}
		},
		
		assignmentsToEvents : function(assignments){
			
			var events = [];
			
			this.collection.each(function(model){
				events.push({			
		            "id": model.get('platformAssignmentId'),
   		            "title": model.get('title'),
   		            "url": "",
   		            "class": model.get('preamble'),
   		            "start": moment(model.get('availableDate')).valueOf(), 
   		            "end": moment(model.get('dueDate')).valueOf(),
   		            
					'ownerId':model.get('ownerId'),
					'creatorId': model.get('creatorId'),
					'status': model.get('status'),
					'type': model.get('type')
				});
				}, this);
			
			console.log(events);
			return events;			
		}
	});
});