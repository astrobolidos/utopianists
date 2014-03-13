var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone'],function(){
	hmh.api.endpoint = Backbone.View.extend({
			
	    events:{
	        'click #api-get': 'apiGet',
	        'click #api-put': 'apiPut',
	        'click #api-post': 'apiPost',
	        'click #api-delete': 'apiDelete',
	        'click #api-options': 'apiOptions'
	    },
	    
	    requesttemplate :
	    	'<div class="row col-lg-offset-1 col-lg-9">' +     	
	    		'<h4><%= endpoint.charAt(0).toUpperCase() + endpoint.slice(1) %></h4>' +	
				'<form id="assignform">'	 + 	
					'<div class="input-group">'+
					   '<input type="text" class="form-control" id="query" placeholder="add to url, e.g. /teacher or ?id=1">' + 
						'<span class="input-group-btn">' +
						  '<button id="api-get" class="btn btn-default" type="submit">Get</button>' +
						  '<button id="api-put" class="btn btn-default" type="submit">Put</button>' +
						  '<button id="api-post" class="btn btn-default" type="submit">Post</button>' + 
						  '<button id="api-delete" class="btn btn-default" type="submit">Delete</button>' + 
						  '<button id="api-options" class="btn btn-default" type="submit">Options</button>' + 
						'</span>' +	
					'</div>' +
					'<div>' +
						'<textarea class="well col-lg-12" id="post-request">' +
						'{"title":"Pre Populated Title1","preamble":"Pre Populated Preamble1","ownerId":"cfd136d8-f1ec-46d3-aa0e-9d923db7964c",' + 
						'"creatorId":"aa007150-6d71-4e16-a532-4639131ef38c","status":"IN_PROGRESS","type":"TODO_TYPE_2","dueDate":"2014-02-08",' + 
						'"availableDate":"2014-02-01"}' +
						'</textarea>' + 
					'</div>' +
					'</form>' + 	
				'<div id="response-panel" ></div>'+
			'</div>',
			
		responseTemplate : 
			'<div class="panel panel-default">' + 
			  '<div class="panel-heading"><h3 class="panel-title">Response</h3></div>' + 
			  '<div class="panel-body" id="assign-result">No Response</div>' + 
			'</div>',

	    initialize:function (args) {
	    	_.extend(this, args);
	        _.bindAll(this, "render", "renderResult", "apiGet", "apiPost","apiPut", "apiOptions", "apiDelete", "formhandler");    
	    	this.render();
	    },
	    
	    render:function (args) {
		    this.el.append(_.template(this.requesttemplate, this));	 
		    $("#assignform").submit(this.formhandler);   
		    this.method = "get";
	    },  
	    
	    formhandler:function (event) {
	    	event.preventDefault();
	    	var that = this; 
	    	$.ajax({
	    		  url: this.endpoint + $('#query').val(),
	    		  contentType : 'application/json',	    		  
	    		  type: this.method,
	    		  data: JSON.stringify($('#post-request').val()),
	    		  context: document.body
	    		})
	    		.done(this.renderResult)
	    		.error(this.renderResult);	
	    },
	    
	    renderResult : function (data, status, jqXHR){
			$('#response-panel').empty();
			$('#response-panel').append(_.template(this.responseTemplate, this));	   			
			$('.panel-title').text(status.charAt(0).toUpperCase() + status.slice(1));  			
			$('#assign-result').html( this.syntaxHighlight(JSON.stringify(data)));	
			
			switch(status){
				case 'success' :
					$('#response-panel .panel').addClass('panel-success');	
					break;
				case 'error' :
					$('#response-panel .panel').addClass('panel-danger');
					break;
			}
	    },
	    
	    apiGet		:function () { this.method = "get"},  
	    apiPost		:function () { this.method = "post"},      
	    apiPut		:function () { this.method = "put"},    
	    apiDelete	:function () { this.method = "delete"},	    
	    apiOptions	:function () { this.method = "options"},
	    
	    
	    // http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
	    syntaxHighlight : function (json) {
	        if (typeof json != 'string') {
	             json = JSON.stringify(json, undefined, 2);
	        }
	        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
	            var cls = 'number';
	            if (/^"/.test(match)) {
	                if (/:$/.test(match)) {
	                    cls = 'key';
	                } else {
	                    cls = 'string';
	                }
	            } else if (/true|false/.test(match)) {
	                cls = 'boolean';
	            } else if (/null/.test(match)) {
	                cls = 'null';
	            }
	            return '<span class="' + cls + '">' + match + '</span>';
	        });
	    }
	});
});