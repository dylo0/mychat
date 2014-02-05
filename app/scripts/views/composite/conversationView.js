define([
	'backbone',
	'views/item/messageView',
	'hbs!tmpl/composite/conversationView_tmpl'
],
function( Backbone, MessageView, ConversationviewTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Conversationview CompositeView");
		},
		
    	itemView: MessageView,
    	template: ConversationviewTmpl,
    	className: "col-sm-3 col-conversation",
    	

    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: "#conversation-messages-container",

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
