(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/UserView'
		],
		function( Userview ) {

			describe('Userview Itemview', function () {

				it('should be an instance of Userview Itemview', function () {
					var UserView = new Userview();
					expect( UserView ).to.be.an.instanceof( Userview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );