define(function() {
	'use strict';

	/* return an array of specs to be run */
	return {
		specs: ['spec/collections/Conversations.js',
		'spec/collections/Messages.js',
		'spec/collections/UserContacts.js',
		'spec/exampleTest.js',
		'spec/models/Credentials.js',
		'spec/models/Message.js',
		'spec/models/UserContact.js',
		'spec/regions/container.js',
		'spec/views/collection/conversationsView.js',
		'spec/views/composite/UserListView.js',
		'spec/views/composite/chatView.js',
		'spec/views/composite/conversationView.js',
		'spec/views/item/LoginView.js',
		'spec/views/item/UserView.js',
		'spec/views/item/messageView.js',
		'spec/views/layout/ChatLayout.js'
		]
	};
});
