var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone'],function(){
    hmh.api.meetingView = Backbone.View.extend({
        events:{ },

        template :
            '<div class="row col-lg-offset-1 col-lg-9">' +
                '<h4>welcome to the meeting view</h4>' +
                '</div>',

        initialize:function (args) {
            _.extend(this, args);
            _.bindAll(this, "render");
            this.render();
        },

        render:function (args) {
           $('#current-page').append(_.template(this.template, this));
        }
    })
});
