define([
	'backbone',
	'models/UserContact'
],
function( Backbone, Usercontact ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Usercontacts collection");
		},

		model: Usercontact
		
	});
});
