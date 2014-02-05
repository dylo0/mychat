define([
	'backbone',
	'hbs!tmpl/item/messageView_tmpl'
],
function( Backbone, MessageviewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Messageview ItemView");
			
		},

    	template: MessageviewTmpl,
        className: "chat-message",

		templateHelpers: {
			// msg: this.msg,
			// created: this.created,
			// sendTime: this.sendTime,
		},

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {
			
		}
	});

});
