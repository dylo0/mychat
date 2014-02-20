define(["app", "hbs!apps/login/incomingUser/templates/login_template"], function(AppManager, loginTmpl){
    AppManager.module("LoginApp.IncomingUser.View", function(View, AppManager, Backbone, Marionette, $, _){
        View.loginView = Backbone.Marionette.ItemView.extend({
        	initialize: function () {
        	   this.on('login:error', this.errorStyling)
        	},

        	template: loginTmpl,
            
            ui: {
                statusLabel: '#login-label',
                nameInput: '#name-input',
                loginButton: '#login-btn'
            },

            events: {
                'click #login-btn': 'loginAttempt',
                'keypress #name-input': 'onInputKeypress'

            },

            onInputKeypress: function (e) {
                // e.preventDefault();
                var ENTER_KEY = 13;

                if ( e.which === ENTER_KEY) {
                    this.loginAttempt(e);
                }
            },

            loginAttempt: function (e) {
                e.preventDefault();
                console.log('view triggered login attempt');
                var username = this.ui.nameInput.val().trim();

                if (username) {
                    this.trigger('login:attempt', username);
                }
            },

            errorStyling: function (error) {
                this.ui.statusLabel.addClass('text-danger')
                this.ui.nameInput.addClass('has-error')
                this.ui.loginButton.removeClass('btn-default')
                this.ui.loginButton.addClass('btn-danger')

                if (error.type === 'user:exists') {
                    this.ui.statusLabel.text('Name already used. Please select a different one.');
                } else {
                    this.ui.statusLabel.text('Error has occured. Please try again later.');
                }
            }
        });

    });
    
    return AppManager.LoginApp.IncomingUser.View
});