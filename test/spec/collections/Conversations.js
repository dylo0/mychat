(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/Conversations'
		],
		function( Conversations ) {

			describe('Conversations Collection', function () {

				it('should be an instance of Conversations Collection', function () {
					var Conversations = new Conversations();
					expect( Conversations ).to.be.an.instanceof( Conversations );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );