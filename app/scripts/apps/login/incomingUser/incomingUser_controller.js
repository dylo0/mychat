define(["app", "apps/login/incomingUser/incomingUser_view"], function(AppManager, View){
    AppManager.module("LoginApp.IncomingUser", function(IncomingUser, AppManager, Backbone, Marionette, $, _){
        IncomingUser.Controller = {
            showLoginPage: function () {
                var loginView = this.getLoginView();
                var that = this;

                loginView.on('login:attempt', function (username) {
                    that.loginAttempt(loginView, username);
                });

                AppManager.loginRegion.show(loginView);
            },

            getLoginView: function  () {
                return new View.loginView();
            },

            loginAttempt: function (view, username) {
                var promise = AppManager.request('login:permission', username);
                
                promise.done(function (resp) {
                    if (resp.error) {
                        console.log(resp.error.type);
                        view.trigger('login:error', resp.error);
                    } else {
                        AppManager.trigger('login:success', resp);
                    }
                });
            }

        }

        return AppManager.LoginApp.IncomingUser.Controller
    });
});

