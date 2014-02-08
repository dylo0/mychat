define([
	'backbone',
	'communicator',
	'hbs!tmpl/app-container',
	'models/Credentials',
	'models/UserContact',
	'views/layout/AppLayout',
	'views/item/LoginView',
	'views/composite/ChatView',
	'views/composite/UserListView',
	'views/collection/conversationsView',
	'collections/Messages',
	'collections/UserContacts',
	'collections/Conversations'
],

function( Backbone, Communicator, App_container, Credentials, UserContact, AppLayout, LoginView, ChatView, UserListView, ConversationsContainer, Messages, UserContacts, Conversations) {
    'use strict';

	var appContainer = App_container;

	var AppManager = new Backbone.Marionette.Application();

	/* Add application regions here */
	AppManager.addRegions({
		container: '#application'
	});

	/* Add initializers here */
	AppManager.addInitializer( function () {
		document.body.innerHTML = appContainer();
		Communicator.mediator.trigger("APP:START");

		var loginView = new LoginView({ model: new Credentials });

		// temp
		initializeLayout(new Credentials);
		//uncomment that :)
		// App.container.show(loginView);
	});

	var initializeLayout = function (authModel) {
		var appLayout = new AppLayout({model: authModel});
		var chat = new ChatView({collection: new Messages});

		var sampleConversations = new Conversations([
			new UserContact({userName: "Tomasz", id: 1}),
			new UserContact({userName: "Patryk", id: 2}),
		]);

		var activeConversations = new ConversationsContainer({collection: sampleConversations});
		
		var sampleUserList = new UserContacts([
			new UserContact({userName: "Tomasz", id: 1}),
			new UserContact({userName: "Patryk", id: 2}),
			new UserContact({userName: "Maciej", id: 3}),
			new UserContact({userName: "Reveh", id: 4})
		]);

		var contacts = new UserListView({collection: sampleUserList});

		AppManager.container.show(appLayout);
		appLayout.main.show(chat);
		appLayout.additional.show(contacts);
		appLayout.conversations.show(activeConversations);
	};

	Communicator.mediator.on('conversation:requestConversation', function (user) {
		console.log(user);
		sampleConversations.add(user);
	}); 

	Communicator.mediator.on('APP:userAuthenticated', function (authModel) {
		console.log('authenticated!');
		initializeLayout(authModel);
	});

	Communicator.mediator.on("APP:Logout", function () {
		// App.container.show(Loginscreen);
		console.log('user logged out');
	});

	return AppManager;
});
