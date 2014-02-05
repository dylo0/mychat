define([
	'backbone',
	'views/item/UserView',
	'hbs!tmpl/composite/UserListView_tmpl'
],
function( Backbone, Userview, UserlistviewTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Userlistview CompositeView");
		},		

    	itemView: Userview,
 		className: 'jumbotron variable-height',
    	template: UserlistviewTmpl,
    	
    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: "#contact-list-container",

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}

		
	});
});
