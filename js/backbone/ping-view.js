var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone'],function(){
	hmh.api.pingview = Backbone.View.extend({
			
	    events:{},
	    
	    template :
	    	'<div class="row col-lg-offset-1 col-lg-9">' +     	
	    		'<h4>Ping all endpoints</h4>' +	
	    		'<ul id="ping-results"></ul>' +
			'</div>',

	    endpointTemplate :
	    	'<li class="bs-callout bs-callout-warning">' +     	
    			'<h4><%= endpoint %> </h4>' +	
    		'</li>', 

	    resultTemplate :
	    	'<li class="bs-callout bs-callout-<%= status %>">' +     	
    			'<h4><%= type %> <%= data.status %> <%= data.statusText %>: <%= data.responseJSON.message %> </h4>' +	
    		'</li>', 

	    initialize:function (args) {
	    	_.extend(this, args);
	        _.bindAll(this, "render", "eachEndpoint", "testEndpoint", "renderEndpoint");    
	    	this.render();
	    },
	    
	    render:function (args) {
	    	this.el.empty();
		    this.el.append(_.template(this.template, this));	 
		    
		    for (point in this.endpoints)
              this.eachEndpoint(this.endpoints[point]);
	    },
	    
	    eachEndpoint : function(endpoint){
	    	
	    	var template = $(_.template(this.endpointTemplate, {endpoint: endpoint + " endpoint"}));	    	
	    	this.testEndpoint(template, endpoint);	    	
	    	this.el.find('#ping-results').append(template);	 
	    },
	    
	    testEndpoint: function(element, endpoint){
	    	
	    	var self = this;
	    	var  getCall = { url: endpoint, element : element, type : 'GET'};
	    	$.ajax(getCall).complete(
	    			function(data, textStatus, jqXHR) {
	    				self.renderEndpoint(data, textStatus, jqXHR, getCall)});
	    	
	    	var postCall = { url: endpoint, element : element, type : 'POST'};
	    	$.ajax(postCall).complete(
    				function(data, textStatus, jqXHR) {
    					self.renderEndpoint(data, textStatus, jqXHR, postCall)});
	    	
	    	var putCall = { url: endpoint, element : element, type : 'PUT'};	    	
	    	$.ajax(putCall).complete(
    				function(data, textStatus, jqXHR) {
    					self.renderEndpoint(data, textStatus, jqXHR, putCall)});
	    	
	    	var delCall = { url: endpoint, element : element, type : 'DELETE'};
	    	$.ajax(delCall).complete(
    				function(data, textStatus, jqXHR) {
    					self.renderEndpoint(data, textStatus, jqXHR, delCall)});    	
	    },
	    
	    renderEndpoint: function(data, textStatus, jqXHR, call){
	    
	    	call.data = data;
	    	call.status = this.highlight(textStatus); 	
	    	call.element.append( _.template(this.resultTemplate, call));
	    },
	    
	   highlight : function (status){
		   
		   switch(status){
			   case  "error" :
				   return 'danger';
			   case  "success" :
				   return 'info';
			   default : 
				   return 'warning';
		   }
	   }
	})
});
	