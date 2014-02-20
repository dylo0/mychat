define(["app", "apps/chat/list/list_view"], function(AppManager, View){
    AppManager.module("ChatApp.List", function(List, AppManager, Backbone, Marionette, $, _){
        List.Controller = {
            listMessages: function () {
                var messages = AppManager.request('chat:entities');
                var listView = this.getListView(messages);
                var that = this;

                AppManager.on('incoming:chat:message', function (data) {
                    that.addMessage(data, messages)
                });

                AppManager.on('user:connected', function (data) {
                    var msg = data.username + ' has joined';
                    that.addStatusMessage(msg, messages);
                });

                AppManager.on('user:disconnected', function (id) {
                    var contact = AppManager.request('contact:entity', id);
                    var msg = contact.get('username') + ' has left';
                    that.addStatusMessage(msg, messages);
                });

                listView.on('send:chat:message', function (messageText) {
                    that.sendMessage(messageText, messages);   
                });

                AppManager.mainRegion.show(listView);
            },

            addMessage: function (data, col) {
                var message = AppManager.request('chat:entity:new');
                var contact = AppManager.request('contact:entity', data.sender);
                message.set('msg', data.message);
                message.set('author', contact.get('username'));

                col.add(message);
            },

            addStatusMessage: function (text, col) {
                var message = AppManager.request('chat:entity:new');
                message.set('msg', text);

                col.add(message);
            },

            getListView: function (col) {
                return new View.ChatView({collection: col});
            },

            sendMessage: function (text, col) {
                var userInfo = AppManager.request('user:info');
                var message = AppManager.request('chat:entity:new');
                message.set('msg', text);

                //move t server logic
                message.set('author', userInfo.username)

                data = {
                    //move to server logic
                    sender: userInfo.id,
                    message: text
                };

                AppManager.trigger('send:chat:message', data);

                // adds message to chat 
                col.add(message);
            }
        };
    });

    return AppManager.ChatApp.List.Controller;
});
