define(["app", "apps/contacts/list/list_controller"], function(AppManager, Controller){
    AppManager.module("ContactsApp", function(ContactsApp, AppManager, Backbone, Marionette, $, _){ 
        ContactsApp.startWithParent = false;

        // ContactsApp.allContacts = AppManager.request('contact:entities');

        var API = {
            listUsers: function () {
                ContactsApp.List.Controller.listUsers();
            },

            getContacts: function  () {
                return ContactsApp.allContacts;
            },

            getContact: function (id) {
                return ContactsApp.getContact(id);
            }
        };

        ContactsApp.on("start", function () {
            API.listUsers();
        });


        AppManager.reqres.setHandler('user:contacts', function () {
            return API.getContacts();
        });
    });

    return AppManager.ContactsApp;
});