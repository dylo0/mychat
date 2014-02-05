(function() {
	'use strict';

	var root = this;

	root.define([
		'models/UserContact'
		],
		function( Usercontact ) {

			describe('Usercontact Model', function () {

				it('should be an instance of Usercontact Model', function () {
					var UserContact = new Usercontact();
					expect( UserContact ).to.be.an.instanceof( Usercontact );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );