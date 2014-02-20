define(["app", "apps/login/incomingUser/incomingUser_controller"], function(AppManager, Controller){
    AppManager.module("LoginApp", function(LoginApp, AppManager, Backbone, Marionette, $, _){ 
        LoginApp.startWithParent = false;

        var API = {
            showLoginPage: function () {
                LoginApp.IncomingUser.Controller.showLoginPage();
            }
        };

        LoginApp.on("start", function () {
            console.log('login app started');
            API.showLoginPage();
        });
    });

    return AppManager.LoginApp;
});