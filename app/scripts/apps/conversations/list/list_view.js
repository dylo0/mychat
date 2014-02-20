define(["app",
        "hbs!apps/conversations/list/templates/conversation_tmpl", 
        "hbs!apps/conversations/list/templates/message_tmpl"],
        function(AppManager, conversationTmpl, messageTmpl){
    AppManager.module("ConversationsApp.List.View", function(View, AppManager, Backbone, Marionette, $, _){
        
        View.MessageView = Backbone.Marionette.ItemView.extend({      
            template: messageTmpl,
            className: "chat-message"
        });

        View.ConversationView = Backbone.Marionette.CompositeView.extend({
            initialize: function () {                
                this.collection = this.model.messages;
                this.model.on('conversation:open', this.openConversation, this);
                this.model.on('new:message', this.onNewMessage, this);
            },

            itemView: View.MessageView,
            itemViewContainer: "#conversation-messages-container",
            template: conversationTmpl,
            className: "col-sm-6 col-md-3 conversation",
            
            ui: {
                input: '#conversation-msg-input',
                messages: '#conversation-messages-container',
                collapsePanel: '.panel-collapse',
                headingUsername: '.panel-heading a',
                conversationHeading: '.panel-heading',
                notificationIcon: '.notification-icon'
            },

            events: {
                'click .close': 'closeView',
                'click .panel-heading a': 'onHeadingClick',
                'keypress #conversation-msg-input': 'onInputKeypress',
                'shown.bs.collapse .panel-collapse': 'scrollMessages'
            },

            closeView: function () {
                this.trigger('conversation:close');
            },

            onShow: function () {
                this.scrollMessages();
            },

            onNewMessage: function () {
                //changes ui style if panel is collapsed
                if (this.ui.collapsePanel.hasClass('collapse')) {
                    this.ui.notificationIcon.removeClass('hide');
                    this.ui.conversationHeading.css('background', '#ddd');
                    this.trigger('message:unread');
                }

                this.scrollMessages();
            },

            onInputKeypress: function (evt) {
                var ENTER_KEY = 13;

                if ( evt.which === ENTER_KEY) {
                    this.sendMessage();
                }
            },

            scrollMessages: function () {
                 this.ui.messages.scrollTop(this.ui.messages[0].scrollHeight);
            },

            sendMessage: function () {
                var messageText = this.ui.input.val().trim();
                if (messageText) {
                    this.trigger('send:message', this.model, messageText);
                    this.ui.input.val('');
                  
                    //scrolls messages container to bottom
                    this.scrollMessages();
                }
            },

            onHeadingClick: function () {
                if (this.ui.collapsePanel.hasClass('collapse')) {
                    this.trigger('conversation:open', this.model);
                } 
            },

            openConversation: function () {
                this.bindUIElements();
                
                // reset header background color and remove notification icon
                this.ui.conversationHeading.css('background', 'rgb(245,245,245)');
                this.ui.notificationIcon.addClass('hide');

                //open conversation panel
                this.ui.collapsePanel.collapse('show');
                
                // focus on input element
                this.ui.input.focus();
            }

        });


        View.ConversationList = Backbone.Marionette.CollectionView.extend({
            itemView: View.ConversationView,
            className: 'active-conversations',
        });
    });

    return AppManager.ConversationsApp.List.View;
});
