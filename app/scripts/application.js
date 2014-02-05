define([
	'backbone',
	'communicator',
	'hbs!tmpl/app-container',
	'models/Credentials',
	'models/UserContact',
	'models/Message',
	'views/layout/AppLayout',
	'views/item/LoginView',
	'views/composite/ChatView',
	'views/composite/UserListView',
	'views/composite/conversationView',
	'views/collection/conversationsView',
	'collections/Messages',
	'collections/UserContacts',
	'collections/Conversations'
],

function( Backbone, Communicator, App_container, Credentials, UserContact, Message, AppLayout, LoginView, ChatView, UserListView, ConversationView, ConversationsContainer, Messages, UserContacts, Conversations) {
    'use strict';

	var appContainer = App_container;

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		container: '#application'
	});

	/* Add initializers here */
	App.addInitializer( function () {
		document.body.innerHTML = appContainer();
		Communicator.mediator.trigger("APP:START");

		// var sampleMessages = new Messages([
		// 	new Message({"msg": "hellou there"}),
		// 	new Message({"msg": "how are you"}),
		// 	new Message({"msg": ", Yeah!"})
		// 	]
		// );

		var loginView = new LoginView({ model: new Credentials });

		// comment that
		initializeLayout(new Credentials);
		//uncomment that :)
		// App.container.show(loginView);
	});

	var initializeLayout = function (authModel) {
		var appLayout = new AppLayout({model: authModel});
		var chat = new ChatView({collection: new Messages});

		// var sampleConversations = new Conversations([		
		// 		new ConversationView({userName: 'Maciej'}),
		// 		new ConversationView({userName: 'Patryk'}),
		// 		new ConversationView({userName: 'Lolo'})
		// 	]);

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
		
		

		App.container.show(appLayout);
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

	return App;
});
