define(["app", "apps/conversations/list/list_view"], function(AppManager, View){
    AppManager.module("ConversationsApp.List", function(List, AppManager, Backbone, Marionette, $, _){
        List.Controller = {

            listConversations: function () {
                var activeConversations = AppManager.request("conversation:entities");
                // _.each(activeConversations, function (user) {

                //     message = AppManager.request("chat:entity:new");
                //     message.set('msg', messageText);
                //     col.add(message);                    
                // })


                var listView = this.getConversationsView(activeConversations);
                var that = this;

                AppManager.on('conversation:new', function (user) {
                    activeConversations.add(user.model);
                    that.openConversation(user);
                });

                AppManager.on("incoming:message", function (user, message) {
                    activeConversations.add(user);
                    user.messages.add(message);
                    this.model.trigger('conversation:new');
                });

                listView.on('itemview:send:message', function (childview, model, text) { 
                    message = AppManager.request("chat:entity:new");
                    message.set('msg', text);
                    model.messages.add(message);
                });

                listView.on('itemview:conversation:close', function (user) {
                    console.log('close triggered');

                    activeConversations.remove(user.model);
                });
                
                AppManager.conversationsRegion.show(listView);
            },

            getConversationsView: function (col) {
                return new View.ConversationList({collection: col});
            },

            openConversation: function (user) {
                user.model.set('unreadMessagesNr', undefined);
                user.model.trigger('conversation:open');
            },

            newMessage: function (user, message) {
                user.messages.add(message);
            },

            sendMessage: function (messageText, col) {
                message = AppManager.request("chat:entity:new");
                message.set('msg', messageText);
                col.add(message);
            }
        };
    });

    return AppManager.ConversationsApp.List.Controller;
});