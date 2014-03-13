var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone'],function(){
    hmh.api.meetingView = Backbone.View.extend({
        events:{
            'click #sStart' : 'selectStart',
            'click #sEnd'   : 'selectEnd'
        },

        selectStart: function() {
            console.log('selectStart');
        },

        selectEnd: function() {
            console.log('selectEnd');
        },

        template :
            '<div class="row col-lg-offset-1 col-lg-9">' +
                '<h4>welcome to the meeting view</h4>' +
                '<div class="form-group">' +
                    '<label for="iMeeting" class="col-sm-2 control-label">Meeting:</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="email" class="form-control" id="iMeeting" placeholder="what is this meeting about?">' +
                        '<span class="glyphicon glyphicon-inbox form-control-feedback"></span>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="iStart" class="col-sm-2 control-label">Start:</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="date" class="form-control" id="iStart" placeholder="when this thing will start?">' +
                        '<span id="sStart" class="glyphicon glyphicon-calendar form-control-feedback"></span>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="iEnd" class="col-sm-2 control-label">End:</label>' +
                    '<div class="col-sm-10">' +
                        '<input type="date" class="form-control" id="iEnd" placeholder="when this thing will end?">' +
                        '<span id="sEnd" class="glyphicon glyphicon-calendar form-control-feedback"></span>' +
                    '</div>' +
                '</div>' +
            '</div>',


        el: $('body'),

        initialize:function (args) {
            _.extend(this, args);
            _.bindAll(this, "render");
            this.render(args);
        },

        render:function (args) {
           //$('#current-page').append(_.template(this.template, this));

            this.$el.html(this.template);//this.model.attributes));
            return this.$el;
        }
    })
});
