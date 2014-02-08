define(["app", "apps/chat/list/list_view"], function(AppManager, View){
    AppManager.module("ChatApp.List", function(List, AppManager, Backbone, Marionette, $, _){
        List.Controller = {
            listMessages: function () {
                var messages = AppManager.request("chat:entities");
                var listView = this.getListView(messages);

                listView.on('send:message', function (messageText) {
                    List.Controller.sendMessage(messageText, messages);   
                });

                AppManager.mainRegion.show(listView);
            },

            getListView: function (col) {
                return new View.ChatView({collection: col});
            },

            sendMessage: function (messageText, col) {
                message = AppManager.request("chat:entity:new");
                message.set('msg', messageText);
                col.add(message);
            }
        };
    });

    return AppManager.ChatApp.List.Controller;
});
