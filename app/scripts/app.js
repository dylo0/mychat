define(['backbone', 'communicator'], function ( Backbone, Communicator) {
    AppManager = new Backbone.Marionette.Application();

    AppManager.addRegions({
        mainRegion:       "#main-region",
        sidebarRegion:    "#sidebar",
        conversationsRegion:     "#conversations-region"
    });

    AppManager.addInitializer( function () {
        setUIBehavior();
        console.log('app manager initialized');
        AppManager.module("ChatApp").start();
        AppManager.module("ConversationsApp").start();
        AppManager.module("ContactsApp").start();
    });

    var setUIBehavior = function () {
        $(document).ready(function(){
            // hardcoded 150px for top menu and conversations in footer
            var targetHeight = $(window).height() - 150;
            var mainRegion = $('#main-region');
            var sidebarRegion = $('#sidebar');

            mainRegion.height(targetHeight);
            sidebarRegion.height(targetHeight);

            $(window).resize(function(){
                var targetHeight = $(window).height() - 150;
                mainRegion.height(targetHeight);
                sidebarRegion.height(targetHeight);
            });
        });
    }


    return AppManager;
});