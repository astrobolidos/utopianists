var hmh = hmh || {};
hmh.api = hmh.api || {};


// PoC that allows CRUD on assignments

define(['jquery', 'backbone', 'teacherassignmentmodel','teacherassignmentcollection','assignmentitem'],function(){
	hmh.api.assignmentview = Backbone.View.extend({
			
	    events:{
	    	'click #create' : 'create'
	    },
	    
	    collection : {},
	    
	    template :
	    	'<div class="assigment-header row col-lg-offset-1 col-lg-9">' +     	
	    		'<h3>Unfiltered list of Assignments (Click text to edit)' +
					'<button type="button" id="create" class="pull-right btn btn-primary">' +
					  '<span class="glyphicon glyphicon-plus"></span> Create' +
					'</button>'+
	    		'</h3>' +
	    		'<ul id="assignment-list"></ul>' +
			'</div>',

	    initialize:function (args) {
	    	
	    	_.extend(this, args);
	        _.bindAll(this, 'render', 'renderAssignment', 'error');    
            
	        this.collection = new hmh.api.teacherAssignmentCollection();	
	        this.collection.bind("reset", this.render);
	        this.collection.fetch({
	        		success : this.render,
	        		error : this.error
	        	});
	    },
	    
	    render:function (args) {
	    	
	    	this.el.empty(); // should remove all views first
		    this.el.append(_.template(this.template, this));    
		    this.collection.sort();
            this.collection.each(this.renderAssignment);
	    },
	    
	    create : function (e){
	    	
	    	var model = new hmh.api.teacherAssignmentModel();
	    	this.collection.add(model,{at: 0});
	    	model.save();

	    	var item = new hmh.api.assignmentItem({model : model});
	    	$(item.render()).prependTo($('#assignment-list')).hide().slideDown('slow');	
	    },
	    
	    renderAssignment : function (model){

	    	var item = new hmh.api.assignmentItem({model : model});
	    	$($('<li></li>').append(item.render())).appendTo($('#assignment-list')).show();
	    },
	    
	    error : function (collection, xhr){
	    	
	    	this.$el.empty();
	    	this.$el.append('<div class="alert alert-danger">Assignments connection : '
	    			+ xhr.status + ' ' 
	    			+ xhr.statusText + '</div>');	    		    	
	    }
	})
});
	