var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone'],function(){
	hmh.api.testview = Backbone.View.extend({
			
	    events:{ },
	    
	    template :
	    	'<div class="row col-lg-offset-1 col-lg-9">' +     	
	    		'<h4>Run QUnit Tests</h4>' +	
			'</div>',

	    initialize:function (args) {
	    	_.extend(this, args);
	        _.bindAll(this, "render");    
	    	this.render();
	    },
	    
	    render:function (args) {
		    this.el.append(_.template(this.template, this));	
		    
		    // TODO: need qunit tests here

	    }
	})
});
	