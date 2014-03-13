var hmh = hmh || {};
hmh.api = hmh.api || {};

define(
		[ 'jquery', 'backbone', 'moment', 'assignmentmodel',
				'assignmentcollection', 'assignmentitem' ],
		function() {
			hmh.api.dueview = Backbone.View
					.extend({

						dateFormat : 'YYYY-MM-DDTHH:mm:ss',

						events : {},
						collection : {},

						template : '<div class="row col-lg-offset-1 col-lg-9">'
								+ '<h3>Assignments Due</h3>'
								+ '<div class="panel panel-success">'
								+ '<div class="panel-heading">'
								+ '<h3 class="panel-title">Due Today</h3>'
								+ '</div>'
								+ '<div class="panel-body" id="today"></div>'
								+ '</div>'
								+ '<div class="panel panel-warning">'
								+ '<div class="panel-heading">'
								+ '<h3 class="panel-title">Due Tomorrow</h3>'
								+ '</div>'
								+ '<div class="panel-body" id="tomorrow"></div>'
								+ '</div>' + '</div>',

						initialize : function(args) {
							_.extend(this, args);
							_.bindAll(this, 'render', 'error');

							this.el.append(_.template(this.template));

							var today_params = {
								'from' : moment().format(this.dateFormat),
								'to' : moment().hours(24).format(
										this.dateFormat),
								'offset' : '0',
								'pagesize' : '1'
							};
							var tomorrow_params = {
								'from' : moment().hours(24).format(
										this.dateFormat),
								'to' : moment().hours(48).format(
										this.dateFormat),
								'offset' : '0',
								'pagesize' : '1'
							};

							this.collection = new hmh.api.assignmentCollection();
							this.collection.day = "today";
							this.collection.bind("reset", this.render);
							this.collection.fetch({
								success : this.render,
								data : 'dueNext=true'
							});

							this.tomorrowCollection = new hmh.api.assignmentCollection();
							this.tomorrowCollection.day = "tomorrow";
							this.tomorrowCollection.bind("reset", this.render);
							this.tomorrowCollection.fetch({
								success : this.render,
								error : this.error,
								data : 'dueToday=true'
							});
						},

						render : function(collection) {

							$('#' + collection.day).empty();
							collection.sort();
							this.renderAssignment(collection.models[0]);
						},

						renderAssignment : function(model) {
							var item = new hmh.api.assignmentItem({
								model : model
							});
							$(item.render()).appendTo(
									$('#' + model.collection.day)).show();
						},

						error : function(collection, xhr) {

							this.$el.empty();
							this.$el
									.append('<div class="alert alert-danger">Assignments connection : '
											+ xhr.status
											+ ' '
											+ xhr.statusText
											+ '</div>');
						}
					})
		});