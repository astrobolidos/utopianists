var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone', 'teacherassignmentmodel'],function(){
	hmh.api.assignmentItem = Backbone.View.extend({
			
	    events:{
	    	'click #delete' : 'itemDelete',
	    	'click #save' : 'itemSave'
	    },
	    
	    tag : "ul",

	    assignmentTemplate :  
	    	'<div class="bs-callout bs-callout-<%= color %>">' +
				'<button type="button" id="save" class="pull-right btn btn-<%= color %> btn-xs">' +
				  '<span class="glyphicon glyphicon-floppy-save"></span></button>'+
				'<button type="button" id="delete" class="pull-right btn btn-<%= color %> btn-xs">' +
				  '<span class="glyphicon glyphicon-minus"></span></button>'+	 	    	
	    		'<h4 contentEditable><%= m.title %></span><%= " (" + m.status.toLowerCase().replace(/_/g," ") +")"%></h4>' +
	    		'<p contentEditable><%= m.preamble %></p>' +  
	    		'Available <span class="label label-info"><%= m.availableDate %></span>' +
	        '</div>',
	    
	    old_assignmentTemplate :
			'<div class="panel panel-default panel-<%= color %>">' + 
			  '<div class="panel-heading"><h3 class="panel-title">' +
					'<span id="title" contentEditable><%= m.title %></span><%= " (" + m.status.toLowerCase().replace(/_/g," ") +")"%>' +
			  '</div>' + 
			  '<div class="panel-body">' +
			  	'<div class="pull-right assign-dates">' +
				  	'Available <span class="label label-info"><%= m.availableDate %></span>' +
				  	'Due <span class="label label-warning"><%= m.dueDate %></span>' +
			    '</div><br/><br/>' +
			    
			    '<div class="well" id="preamble" contentEditable><%= m.preamble %></div>' +
			    '<span class="badge badge-primary"><%= m.type  %></span><br/>' +	
			    
				'<button type="button" id="save" class="pull-right btn btn-<%= color %>">' +
				  '<span class="glyphicon glyphicon-floppy-save"></span> Save' +
				  '</h3>'+
				'</button>'+
				'<button type="button" id="delete" class="pull-right btn btn-<%= color %>">' +
				  '<span class="glyphicon glyphicon-minus"></span> Delete' +
				  '</h3>'+
				'</button>'+
			  '</div>' + 
			'</div>',

	    initialize:function (args) {
	    	
	    	_.extend(this, args);
	        _.bindAll(this, 'render', 'itemDelete','itemSave','markStatus');    

	    },
	    
	    render:function () {
	    	this.model.color = this.markStatus(this.model.get('status'));
            this.setElement( _.template(this.assignmentTemplate, {m: this.model.toJSON(), color: this.model.color}));
            return this.el;
	    },
	    
	    itemDelete:function (e) {
	    	var that = this;
	    	$(this.el).fadeOut("fast", function(){
	    		that.model.destroy();
	    		$(that.el).remove();
	    		that.remove();
	    	});
	    	
	    },
	    
		itemSave:function (e) {
			var that = this;
			this.model.set('preamble', $(this.el).find('#preamble').text());
			this.model.set('title', $(this.el).find('#title').text());
			this.$el.css({ opacity: 0.5 });
			this.model.save(null, {success : function(){that.$el.animate({opacity: 1}, 500);}});		
		},
		
		// Values for bs-callout 
	    markStatus : function (status){
	    	switch(status){
	    	case 'NOT_STARTED' :
	    		return 'info';
	    		
	    	case 'IN_PROGRESS' : 
	    	    return 'warning';
	       	    
	    	case 'TURNED_IN' : 
	    	case 'READY_FOR_SCORING' :
	    	case 'COMPLETED' :
	    	    return 'info';  
	    	    
	    	case 'NOT_SCORED' :
	    	case 'EXPIRED' :
	    	case 'TEACHER_ACTION_REQUIRED' :
	    	case 'PEER_REVIEW_REQUIRED' :
	    	    return 'danger';
	    	}
	    },
	    
	    markPanelStatus : function (status){
	    	switch(status){
	    	case 'NOT_STARTED' :
	    		return 'primary';
	    		
	    	case 'IN_PROGRESS' : 
	    	    return 'success';
	       	    
	    	case 'TURNED_IN' : 
	    	case 'READY_FOR_SCORING' :
	    	case 'COMPLETED' :
	    	    return 'info';  
	    	    
	    	case 'NOT_SCORED' :
	    	case 'EXPIRED' :
	    	    return 'warning';
	 
	    	case 'TEACHER_ACTION_REQUIRED' :
	    	case 'PEER_REVIEW_REQUIRED' :
	    	    return 'danger';
	    	}
	    }
	})
});
	