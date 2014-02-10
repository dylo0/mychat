require([
	'backbone',
	'app',
	'apps/chat/chat_app',
	'apps/contacts/contacts_app',
	'apps/conversations/conversations_app',
	'entities/message',
	'entities/contact',
	'entities/conversation',
	'regionManager'
],
function ( Backbone, App ) {
    'use strict';

	App.start();
});
