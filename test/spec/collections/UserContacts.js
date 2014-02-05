(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/UserContacts'
		],
		function( Usercontacts ) {

			describe('Usercontacts Collection', function () {

				it('should be an instance of Usercontacts Collection', function () {
					var UserContacts = new Usercontacts();
					expect( UserContacts ).to.be.an.instanceof( Usercontacts );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );