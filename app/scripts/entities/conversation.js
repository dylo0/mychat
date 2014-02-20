define(["app"], function(AppManager){
 	AppManager.module("Entities", function(Entities, AppManager, Backbone, Marionette, $, _){	
	   
	    var initializeConversations = function () {
	    	var users = new Entities.UserCollection();

	    	return users.models;
	    }

		var API = {
			getConversationEntities: function () {
				var models = initializeConversations();

				//temperary trigger message for testing:
				AppManager.trigger('incoming:message')

				return new Entities.UserCollection(models);
			},
		}

	    AppManager.reqres.setHandler("conversation:entities", function(){
	      return API.getConversationEntities();
	    });

	    AppManager.reqres.setHandler("conversation:entity:new", function(){
	      return new Entities.User();
	    });
	});

	return;
});