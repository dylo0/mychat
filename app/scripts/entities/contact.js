define(["app"], function(AppManager){
 	AppManager.module("Entities", function(Entities, AppManager, Backbone, Marionette, $, _){
	    Entities.User = Backbone.Model.extend({
			defaults: {
				id: 0,
				name: 'Tomasz'
			}
	    });
		
	    Entities.UserCollection = Backbone.Collection.extend({
	    	model: Entities.User
	    });

	    var initializeUsers = function () {
	    	var users = new Entities.UserCollection([
	    		{name: 'Maciej', id: 1},
	    		{name: 'Tomasz', id: 2},
	    		{name: 'Marcin', id: 3}
	    	]);

	    	return users.models;
	    }

		var API = {
			getUserEntities: function () {
				var models = initializeUsers();
				var users = new Entities.UserCollection(models);

				return users;
			},
		};

	    AppManager.reqres.setHandler("contact:entities", function(){
	      return API.getUserEntities();
	    });

	    AppManager.reqres.setHandler("contact:entity:new", function(){
	      return new Entities.User();
	    });
	});

	return;
});