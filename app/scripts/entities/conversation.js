define(["app"], function(AppManager){
 	AppManager.module("Entities", function(Entities, AppManager, Backbone, Marionette, $, _){	
	   
	    var initializeConversations = function () {
	    	var users = new Entities.UserCollection([
	    		{
	    			name: 'Maciej', 
	    		 	id: 1, 
	    		 	messages: [
	    				new Entities.Message({author: 'Maciej', msg: 'hellou'}),
	    				new Entities.Message({author: 'Maciej', msg: 'hi'}),
	    				new Entities.Message({author: 'Maciej', msg: 'kiko'})
	    			]
	    		},
	    		{
	    			name: 'Marcin', 
	    			id: 3,
	    		 	messages: [
	    				new Entities.Message({author: 'Marcin', msg: 'hellou'}),
	    				new Entities.Message({author: 'Marcin', msg: 'hi'}),
	    				new Entities.Message({author: 'Marcin', msg: 'kiko'})
	    			]
	    		},
	    		{
	    			name: 'Łukasz', 
	    			id: 4
	    		}	    		
	    	]);

	    	return users.models;
	    }

		var API = {
			getConversationEntities: function () {
				var models = initializeConversations();
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