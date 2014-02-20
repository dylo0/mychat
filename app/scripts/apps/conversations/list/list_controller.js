define(["app", "apps/conversations/list/list_view", "ionsound"], function(AppManager, View){
    AppManager.module("ConversationsApp.List", function(List, AppManager, Backbone, Marionette, $, _){
        List.Controller = {

            listConversations: function () {
                var activeConversations = AppManager.request("conversation:entities");
                var listView = this.getConversationsView(activeConversations);
                var that = this;

                AppManager.on('conversation:open', function (user) {
                    that.openConversation(user.model, activeConversations);
                });

                AppManager.on("incoming:message", function (data) {
                    that.addMessage(data, activeConversations)
                });

                listView.on('itemview:conversation:open', function (childview, user) {
                    that.openConversation(user, activeConversations);  
                });

                listView.on('itemview:send:message', function (childview, reciver, text) { 
                    that.sendMessage(reciver, text)
                });

                listView.on('itemview:conversation:close', function (childview) {
                    that.closeConversation(childview, activeConversations);
                });

                listView.on('itemview:message:unread', function (childview) {
                    that.playNewMessageSound();
                });

                ///////////////////////////////////////////////////////////

                // temp tests:
                // temperary redirects chat message to youself for testing

                // AppManager.on('send:chat:message', function (data) {
                //     AppManager.trigger('incoming:message', data);
                // });
                
                //adds test message from dawid on application start
                // var testmsg = AppManager.request('chat:entity:new');
                // testmsg.set('msg', 'this is test message send by Dawid');
                // testmsg.set('author', 'Dawid');
                // AppManager.trigger('incoming:message', {sender: 5, message: testmsg });

                //////////////////////////////////////////////////////////


                AppManager.conversationsRegion.show(listView);
            },

            getConversationsView: function (col) {
                return new View.ConversationList({collection: col});
            },

            openConversation: function (userModel, col) {
                col.add(userModel);
                userModel.trigger('conversation:open');
            },

            closeConversation: function (conversationView, col) {
                col.remove(conversationView.model);
            },

            addMessage: function (data, col) {
                // data: {senderID, reciverID, message model}
                var user = AppManager.request('contact:entity', data.sender);
                col.add(user);
                user.trigger('new:message');
                user.messages.add(data.message);
            },

            sendMessage: function (reciver, text) {
                var userInfo = AppManager.request('user:info');
                var message = AppManager.request('chat:entity:new');
                message.set('msg', text);

                // temp - move to server logic
                message.set('author', userInfo.username)

                data = {
                    //temp - move sender to server logic
                    sender: userInfo.id,
                    reciver: reciver.id,
                    msg: message
                };

                AppManager.trigger('send:message', data);

                // adds message to chat 
                reciver.messages.add(message);
            },

            playNewMessageSound: function () {
                $.ionSound.play("water_droplet:0.5");
            }
        };
    });

    return AppManager.ConversationsApp.List.Controller;
});