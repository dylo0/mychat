define([
	'backbone',
	'communicator',
	'hbs!tmpl/item/UserView_tmpl'
],
function( Backbone, Communicator, UserviewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Userview ItemView");
		},
		
    	template: UserviewTmpl,
        className: 'panel panel-default single-contact',

    	/* ui selector cache */
    	ui: {
    	},

		/* Ui events hash */
		events: {
			'click #start-conversation-btn': 'startConversation'
		},

		startConversation: function () {
			Communicator.mediator.trigger('conversation:requestConversation', this.model)
		},
		/* on render callback */
		onRender: function() {}
	});

});
