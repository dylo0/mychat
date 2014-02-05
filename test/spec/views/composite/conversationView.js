(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/conversationView'
		],
		function( Conversationview ) {

			describe('Conversationview Compositeview', function () {

				it('should be an instance of Conversationview Compositeview', function () {
					var conversationView = new Conversationview();
					expect( conversationView ).to.be.an.instanceof( Conversationview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );