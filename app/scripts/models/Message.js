define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			if (this.isNew()) {
				var sendTime = new Date();
				this.set('created', sendTime.getHours() + ':' + 
				  				   (sendTime.getMinutes()<10?'0':'') + sendTime.getMinutes());
			}
		},

		defaults: {
			author	:	'Tomasz',
			msg 	: 	'',
			created	: 	0,
			sendTime:   '0' 
		}
    });
});
