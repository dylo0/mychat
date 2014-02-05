(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/UserListView'
		],
		function( Userlistview ) {

			describe('Userlistview Compositeview', function () {

				it('should be an instance of Userlistview Compositeview', function () {
					var UserListView = new Userlistview();
					expect( UserListView ).to.be.an.instanceof( Userlistview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );