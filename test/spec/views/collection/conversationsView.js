(function() {
	'use strict';

	var root = this;

	root.define([
		'views/collection/conversationsView'
		],
		function( Conversationsview ) {

			describe('Conversationsview Collectionview', function () {

				it('should be an instance of Conversationsview Collectionview', function () {
					var conversationsView = new Conversationsview();
					expect( conversationsView ).to.be.an.instanceof( Conversationsview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );