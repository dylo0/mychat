define(["app", "apps/chat/list/list_controller"], function(AppManager, Controller){
    AppManager.module("ChatApp", function(ChatApp, AppManager, Backbone, Marionette, $, _){ 
        ChatApp.startWithParent = false;

        var API = {
            listMessages: function () {
                ChatApp.List.Controller.listMessages();
            }
        };

        ChatApp.on("start", function () {
            API.listMessages();
        });
    });

    return AppManager.ChatApp;
});