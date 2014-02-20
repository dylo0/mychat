define(["app"], function(AppManager){
 	AppManager.module("Entities", function(Entities, AppManager, Backbone, Marionette, $, _){	
	   	Entities.Credential = Backbone.Model.extend({
	   		defaults: {
	   			id: 0,
	   			username: ''
	   		}
	   	});

		var API = {
			getCredentialEntity: function () {
				return new Entities.Credential();
			},
		}

	    AppManager.reqres.setHandler("credential:new", function(){
	      return API.getCredentialEntity();
	    });

	});

	return;
});