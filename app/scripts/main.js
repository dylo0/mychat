require([
	'backbone',
	'app',
	'apps/chat/chat_app',
	'apps/contacts/contacts_app',
	'entities/message',
	'entities/contact',
	'regionManager'
],
function ( Backbone, App ) {
    'use strict';

	App.start();
});
