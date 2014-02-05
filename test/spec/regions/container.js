(function() {
	'use strict';

	var root = this;

	root.define([
		'regions/container'
		],
		function( Container ) {

			describe('Container Region', function () {

				it('should be an instance of Container Region', function () {
					var container = new Container();
					expect( container ).to.be.an.instanceof( Container );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );