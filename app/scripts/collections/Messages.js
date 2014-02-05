define([
	'backbone',
	'models/Message'
],
function( Backbone, Message ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Messages collection");
		},

		model: Message		
	});
});
