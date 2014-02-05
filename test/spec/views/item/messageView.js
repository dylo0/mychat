(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/messageView'
		],
		function( Messageview ) {

			describe('Messageview Itemview', function () {

				it('should be an instance of Messageview Itemview', function () {
					var messageView = new Messageview();
					expect( messageView ).to.be.an.instanceof( Messageview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );