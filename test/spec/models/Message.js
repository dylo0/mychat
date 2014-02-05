(function() {
	'use strict';

	var root = this;

	root.define([
		'models/Message'
		],
		function( Message ) {

			describe('Message Model', function () {

				it('should be an instance of Message Model', function () {
					var Message = new Message();
					expect( Message ).to.be.an.instanceof( Message );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );