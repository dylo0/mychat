(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/Messages'
		],
		function( Messages ) {

			describe('Messages Collection', function () {

				it('should be an instance of Messages Collection', function () {
					var Messages = new Messages();
					expect( Messages ).to.be.an.instanceof( Messages );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );