define([
	'backbone',
	'views/item/messageView',
	'models/Message',
	'hbs!tmpl/composite/chatView_tmpl'
],
function( Backbone, Messageview, Message, ChatviewTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Chatview CompositeView");
		},
		
    	itemView: Messageview,
    	template: ChatviewTmpl,
    	className: 'jumbotron chat-region',

    	//className: 'jumbotron',

    	/* ui selector cache */
    	ui: {
    		input: '#message-input',
    		messages: '#chat-messages-container'
    	},

    	/* where are we appending the items views */
    	itemViewContainer: "#chat-messages-container",

		/* Ui events hash */
		events: {
			'keypress #message-input': 'onInputKeypress',
		},

		/* on render callback */
		onRender: function() {},

		onShow: function () {
			this.ui.messages.scrollTop(this.ui.messages[0].scrollHeight);
		},

		onInputKeypress: function (evt) {
			var ENTER_KEY = 13;

	    	if ( evt.which === ENTER_KEY) {
	    		this.sendMessage();
	    	}
		},

		sendMessage: function () {
			var messageText = this.ui.input.val().trim();
			if (messageText) {
		        var msg = new Message({
		        	msg: messageText
		        });

				this.collection.add(msg);
		        this.ui.input.val('');

		        //scrolls messages container to bottom
		        this.ui.messages.scrollTop(this.ui.messages[0].scrollHeight);
			}
		}
	});

});


