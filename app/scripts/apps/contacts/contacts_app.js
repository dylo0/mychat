define(["app", "apps/contacts/list/list_controller"], function(AppManager, Controller){
    AppManager.module("ContactsApp", function(ContactsApp, AppManager, Backbone, Marionette, $, _){ 
        ContactsApp.startWithParent = false;

        var API = {
            listUsers: function () {
                ContactsApp.List.Controller.listUsers();
            }
        };

        ContactsApp.on("start", function () {
            console.log('contacts app started');
            API.listUsers();
        });
    });

    return AppManager.ContactsApp;
});