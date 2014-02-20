define(["app",
        "hbs!apps/chat/list/templates/chat_tmpl", 
        "hbs!apps/chat/list/templates/message_tmpl"],
        function(AppManager, ChatTpl, MessageTpl){
    AppManager.module("ChatApp.List.View", function(View, AppManager, Backbone, Marionette, $, _){
        View.MessageView = Backbone.Marionette.ItemView.extend({
            template: MessageTpl,
            className: "chat-message"
        });

        View.ChatView = Backbone.Marionette.CompositeView.extend({
            itemView: View.MessageView,
            template: ChatTpl,
            className: 'jumbotron chat-region',

            ui: {
                input: '#message-input',
                messages: '#chat-messages-container'
            },

            itemViewContainer: '#chat-messages-container',

            events: {
                'keypress #message-input': 'onInputKeypress',
            },

            onShow: function () {
                this.scrollMessages();
            },

            onAfterItemAdded: function () {
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
                    this.trigger('send:chat:message', messageText);
                    this.ui.input.val('');
                  
                    //scrolls messages container to bottom
                    this.scrollMessages();
                }
            }
        });    
    });

    return AppManager.ChatApp.List.View;
});
