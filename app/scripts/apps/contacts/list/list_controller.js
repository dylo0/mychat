define(["app", "apps/contacts/list/list_view"], function(AppManager, View){
    AppManager.module("ContactsApp.List", function(List, AppManager, Backbone, Marionette, $, _){
        List.Controller = {
            listUsers: function () {
                var users = AppManager.request("contact:entities");
                var listView = this.getListView(users);

                listView.on("itemview:conversation:start", this.startConversation);

                AppManager.sidebarRegion.show(listView);
            },

            getListView: function (col) {
                return new View.ContactsView({collection: col});
            },

            startConversation: function (user) {
                 console.log('conversation with ' + user.model.get('name') + ' started');
            }
        };
    });

    return AppManager.ContactsApp.List.Controller;
});
