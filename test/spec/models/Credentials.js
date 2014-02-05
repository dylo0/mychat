(function() {
	'use strict';

	var root = this;

	root.define([
		'models/Credentials'
		],
		function( Credentials ) {

			describe('Credentials Model', function () {

				it('should be an instance of Credentials Model', function () {
					var Credentials = new Credentials();
					expect( Credentials ).to.be.an.instanceof( Credentials );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );