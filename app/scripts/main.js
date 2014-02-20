require([
	'backbone',
	'backbone.marionette',
	'app',
	'communicator',
	'apps/login/login_app',
	'apps/chat/chat_app',
	'apps/contacts/contacts_app',
	'apps/conversations/conversations_app',
	'entities/credential',
	'entities/message',
	'entities/contact',
	'entities/conversation',
	// 'regionManager'
],
function ( Backbone, Marionette, App ) {
    'use strict';

	App.start();
});
