define(["app"], function(AppManager){
 	AppManager.module("Entities", function(Entities, AppManager, Backbone, Marionette, $, _){
	    Entities.User = Backbone.Model.extend({
			initialize: function () {
				messages = this.get('messages');
				this.messages = new Entities.MessageCollection(messages);
				this.unset('messages');
			},

			defaults: {
				id: 0,
				username: 'Tomasz'
			}
	    });
		
	    Entities.UserCollection = Backbone.Collection.extend({
	    	model: Entities.User
	    });

	    Entities.getContact = function (id) {
            var found;
            var contacts = API.getUserEntities();
            
            $.when(contacts).done(function () {
	            contacts.each(function (contact) {
	                if (contact.get('id') == id) {
	                    found = contact;
	                }
	            });            	
            });

            return found;

            // TODO add fetch contact credentials from server if not found
            // (Case of message from unknown user );
        };

	    Entities.removeUser = function (id) {
	    	user = Entities.getContact(id);
	    	Entities.AllContacts.remove(user);
	    };

	    Entities.initializeUsers = function () {
	    	var users = AppManager.request('user:list');
	    	var defer = $.Deferred();

	    	// lacks error handling for now
	    	users.done(function (entities) {
	    		var allusers = new Entities.UserCollection();
	    		var hostID = AppManager.request('user:info').id;

	    		_.each(entities, function (username, id) {
					if (id != hostID) {
		    			model = new Entities.User({
		    				id: id,
		    				username: username
		    			});
		    		
		    			allusers.add(model);
		    		}
	    		});
				
				Entities.AllContacts = allusers;
				defer.resolve();
	    	});

	    	return defer.promise();
	    };


		var API = {
			initializeUsers: function () {
				return Entities.initializeUsers();
			},

			getUserEntities: function () {
				return Entities.AllContacts;
			},

			getContactEntity: function (id) {
				return Entities.getContact(id);
			},

			addUser: function (data) {
				var user = new Entities.User(data);
				Entities.AllContacts.add(user);
			},

			removeUser: function (id) {
				Entities.removeUser(id);
			}
		};

		var regHandlers = function () {
			AppManager.on('user:connected', function (data) {
				API.addUser(data);
			});

			AppManager.on('user:disconnected', function (data) {
				// temperary commented out (conflict with chat module)
				// API.removeUser(data);
			});

		    AppManager.reqres.setHandler("contact:entities", function(){
		        return API.getUserEntities();
		    });

		    AppManager.reqres.setHandler("contact:entity", function (id) {
		    	return API.getContactEntity(id);
		    });

		    AppManager.reqres.setHandler("contact:entity:new", function(){
		      return new Entities.User();
		    });
		};
		
		AppManager.reqres.setHandler("initialize:contacts", function () {
			return API.initializeUsers();
		});

		AppManager.on('login:success', regHandlers);
	});

	return;
});