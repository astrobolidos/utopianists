
var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone', 'assignmentview'],function(){
    hmh.api.view = Backbone.View.extend({

        devEnv : false, // Is this a developer machine (i.e. localhost)

        el : 'body',
        events:{
        },

        currentpage : {},

        initialize:function (args) {

            _.extend(this, args);
            _.bindAll(this, 'render', 'assignmentView');
            this.render();
        },

        render:function () {
            this.assignmentView();
        },

        assignmentView: function(){

            this.removeView(this.currentpage);
            this.currentpage = new hmh.api.assignmentview({
                el : $('#current-page')
            });
        }
    });
});
