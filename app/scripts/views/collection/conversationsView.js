define([
	'backbone',
	'communicator',
	'views/composite/conversationView'

],
function( Backbone, Communicator, Conversationview  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.CollectionView.extend({

		initialize: function() {
			console.log("initialize a Conversationsview CollectionView");
			Communicator.mediator.on('conversation:requestConversation', function (user) {
				this.collection.add(user);
			}); 
		},
		
    	itemView: Conversationview,
    	className: 'active-conversations',

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {
		},

		/* on render callback */
		onRender: function() {}


	});


	Communicator.mediator.on()

});
