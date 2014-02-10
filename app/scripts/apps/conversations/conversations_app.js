define(["app", "apps/conversations/list/list_controller"], function(AppManager, Controller){
    AppManager.module("ConversationsApp", function(ConversationsApp, AppManager, Backbone, Marionette, $, _){ 
        ConversationsApp.startWithParent = false;

        var API = {
            listConversations: function () {
                ConversationsApp.List.Controller.listConversations();
            }
        };

        ConversationsApp.on("start", function () {
            API.listConversations();
        });
    });

    return AppManager.ConversationsApp;
});