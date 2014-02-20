define(["app", "apps/conversations/list/list_controller", "ionsound"], function(AppManager, Controller){
    AppManager.module("ConversationsApp", function(ConversationsApp, AppManager, Backbone, Marionette, $, _){ 
        ConversationsApp.startWithParent = false;
       
        ConversationsApp.setSoundSettings = function () {
            $.ionSound({
                sounds: [
                    "beer_can_opening",
                    "water_droplet"
                ],
                path: "sounds/",
                multiPlay: true,
                volume: "1.0"
            }); 
        }

        var API = {
            listConversations: function () {
                ConversationsApp.List.Controller.listConversations();
            },

            setSoundSettings : function () {
                ConversationsApp.setSoundSettings();
            }
        };

        ConversationsApp.on("start", function () {
            API.setSoundSettings();
            API.listConversations();
        });
    });

    

    
    return AppManager.ConversationsApp;
});