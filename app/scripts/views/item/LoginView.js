define([
	'backbone',
	'hbs!tmpl/item/LoginView_tmpl',
	'communicator'
],
function( Backbone, LoginviewTmpl, Communicator  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {},
		
    	template: LoginviewTmpl,
        

    	/* ui selector cache */
    	ui: {
    		userName: '#userName'
    	},

		/* Ui events hash */
		events: {
			'submit .form-signin' : "login",
			
		},

		/* on render callback */
		onRender: function() {},

		login: function (e) {
			e.preventDefault();
			console.log("logging in")
			var nickName = this.ui.userName.val().trim();
			if (nickName) {
				this.model.set('userName', nickName);
				console.log('valid');
				Communicator.mediator.trigger('APP:userAuthenticated', this.model);
			}
		},

		preventDefault: function (e) {
			e.preventDefault();

		}
	});

});