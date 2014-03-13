var hmh = hmh || {};
hmh.api = hmh.api || {};

define(['jquery', 'backbone', 'meetingModel'],function(){
    hmh.api.meetingView = Backbone.View.extend({
        events:{
            'click #sStart'         : 'selectStart',
            'click #sEnd'           : 'selectEnd',
            'click #btnSchedule'    : 'schedule',
            'click .list-group-item': 'listItemClick'
        },

        listItemClick: function(element) {
            console.log('listItemClick');
            if(element.target.className.contains('active')) {
                element.target.className = 'list-group-item-heading';
            } else {
                element.target.className += ' active';
            }
        },

        schedule: function() {
            console.log('schedule');
            this.model = new hmh.api.meetingModel();

            this.model.set('roomId', $(this.el).find('#hRoomId').text());
            this.model.set('beginTime', $(this.el).find('#sStart').text());
            this.model.set('endTime', $(this.el).find('#sEnd').text());
            this.model.set('people', [1,2,3,4]);

            this.model.save(this.model.toJSON(),
                {
                    success: function(model, response) { console.log('success'); },
                    error: function(model, response) {
                        console.log('error' + response);
                    }
                });
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
                '<hidden id="hRoomId" value="1" />' +
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
                '<div class="list-group">' +
                    '<a href="#" class="list-group-item ">' +
                        '<img src="/images/homer.jpg" class="image" /> ' +
                        '<h4 class="list-group-item-heading">Homero Simpson</h4>' +
                    '<p class="list-group-item-text">this is homer</p><br/></br>' +
                    '</a>' +
                    '<a href="#" class="list-group-item ">' +
                    '<img src="/images/bart.jpg" class="image" /> ' +
                    '<h4 class="list-group-item-heading">Bartolomeo Simpson</h4>' +
                    '<p class="list-group-item-text">this is homer</p><br/></br>' +
                    '</a>' +
                    '<a href="#" class="list-group-item ">' +
                    '<img src="/images/lisa.jpg" class="image" /> ' +
                    '<h4 class="list-group-item-heading">Lisa Simpson</h4>' +
                    '<p class="list-group-item-text">this is homer</p><br/></br>' +
                    '</a>' +
                '</div>' +

                '<button id="btnSchedule" type="button" class="btn btn-primary btn-lg pull-right">Schedule!</button>' +
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
