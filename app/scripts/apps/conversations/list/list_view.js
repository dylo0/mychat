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
                this.bindUIElements();
                this.collection = this.model.messages;
                this.model.on('conversation:open', this.openConversation, this);
                this.model.on('message:new', this.newMessage, this);
            },

            itemView: View.MessageView,
            itemViewContainer: "#conversation-messages-container",
            template: conversationTmpl,
            className: "col-sm-3 col-conversation",
            
            ui: {
                input: '#conversation-msg-input',
                messages : '#conversation-messages-container'
            },

            events: {
                'click .close': 'closeView',
                'keypress #conversation-msg-input': 'onInputKeypress'
            },

            onBeforeItemAdded: function(){
                
                console.log('new message added');
            },

            closeView: function () {
                this.trigger('conversation:close', this.model);
            },

            onShow: function () {
                this.ui.messages.scrollTop(this.ui.messages[0].scrollHeight);
            },

            onInputKeypress: function (evt) {
                var ENTER_KEY = 13;

                if ( evt.which === ENTER_KEY) {
                    this.sendMessage();
                }
            },

            sendMessage: function () {
                var messageText = this.ui.input.val().trim();
                if (messageText) {
                    this.trigger('send:message', this.model, messageText);
                    this.ui.input.val('');
                  
                    //scrolls messages container to bottom
                    this.ui.messages.scrollTop(this.ui.messages[0].scrollHeight);
                }
            },

            newMessage: function () {
                console.log('message added')
                    // if user collapsed {
                        // unread = user.get("unreadMessagesNr");
                         // = unread? unread + 1 : 1;
                        // header class - warning
                    // } unread += 1
            },
            
            openConversation: function () {
                // add classes to unfold

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
