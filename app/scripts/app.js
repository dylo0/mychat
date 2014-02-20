define(['backbone', 'backbone.marionette'], function ( Backbone) {
    AppManager = new Backbone.Marionette.Application();

    AppManager.addRegions({
        mainRegion:       "#main-region",
        sidebarRegion:    "#sidebar",
        conversationsRegion:     "#conversations-region",
        loginRegion: "#login"
    });

    AppManager.addInitializer( function () {
        AppManager.credentials = {};
        AppManager.module("LoginApp").start(); 
    });

    AppManager.on('login:success', function (credentials) {
        setUserInfo(credentials);

        // waits for contacts initialization for proper application behavior
        var initialized = AppManager.request("initialize:contacts");
        
        // after initialization starts app
        $.when(initialized).done(function () {
           startApplication(credentials); 
        });
    });

    AppManager.reqres.setHandler('user:info', function () {
        return getUserInfo();
    });


    var startApplication = function () {
        setUIBehavior();
        AppManager.loginRegion.close();
        AppManager.module("ChatApp").start();
        AppManager.module("ConversationsApp").start();
        AppManager.module("ContactsApp").start();
    };

    var getUserInfo = function () {
        return AppManager.credentials;
    };

    var setUserInfo = function (credentials) {
        AppManager.credentials = credentials;      
    };

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