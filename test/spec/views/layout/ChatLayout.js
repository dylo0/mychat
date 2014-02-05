(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/ChatLayout'
		],
		function( Chatlayout ) {

			describe('Chatlayout Layout', function () {

				it('should be an instance of Chatlayout Layout', function () {
					var ChatLayout = new Chatlayout();
					expect( ChatLayout ).to.be.an.instanceof( Chatlayout );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );