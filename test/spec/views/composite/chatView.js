(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/chatView'
		],
		function( Chatview ) {

			describe('Chatview Compositeview', function () {

				it('should be an instance of Chatview Compositeview', function () {
					var chatView = new Chatview();
					expect( chatView ).to.be.an.instanceof( Chatview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );