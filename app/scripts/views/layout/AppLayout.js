define([
	'backbone',
	'hbs!tmpl/layout/AppLayout_tmpl'
],
function( Backbone, ApplayoutTmpl) {
    'use strict';

// //on mobile:
// if *$(window).width() < 992) {
// 	// sets height so chat is visible onwhole screen
// 	// i.e. window height - top menu height
// 	// users list is expanded to prevent nested scroolbars
// 	chatHeight = 
// }

// // on desktops
// else { 
// 	//sets whole row height instead of ju
// }

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({



		className: 'container',
    	template: ApplayoutTmpl,  	

    	/* Layout sub regions */
    	regions: {
    		main: "#main-region",
    		additional: "#additional-region",
    		conversations: "#conversations-region"

    	},

    	/* ui selector cache */
    	ui: {
    		mainRegion: "#main-region",
    		additional: "#additional-region"
    	},

		/* Ui events hash */
		events: {},


		initialize: function() {
			this.bindUIElements();
			var that = this;
			$(document).ready(function(){

				// hardcoded 150px for top menu and conversations in footer
				var targetHeight = $(window).height() - 150;
				
				that.ui.mainRegion.height(targetHeight);
				that.ui.additional.height(targetHeight);

	   			$(window).resize(function(){
	   				var targetHeight = $(window).height() - 150;
	   				that.ui.mainRegion.height(targetHeight);
	   				that.ui.additional.height(targetHeight);
			    });
			});


		},
		/* on render callback */
		onRender: function() {}
	});

});
