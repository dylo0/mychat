define(["app", "apps/contacts/list/list_view"], function(AppManager, View){
    AppManager.module("ContactsApp.List", function(List, AppManager, Backbone, Marionette, $, _){
        List.Controller = {
            listUsers: function () {
                var users = AppManager.request("contact:entities");    
                var listView = this.getListView(users);
                var that = this;

                listView.on("itemview:conversation:start", this.startConversation);

                AppManager.sidebarRegion.show(listView);

                AppManager.on("user:connected", function (data) {
                    that.addUser(data, users);
                });

                AppManager.on("user:disconnected", function (id) {
                    that.removeUser(id, users);
                })
            },

            getListView: function (col) {
                return new View.ContactsView({collection: col});
            },

            startConversation: function (user) {
                 AppManager.trigger("conversation:open", user);
            },

            addUser: function (data, col) {
                var user = AppManager.request('contact:entity:new');
                user.set('id', data.id);
                user.set('username', data.username);
                col.add(user);
            },

            removeUser: function (id, col) {
                col.each(function (user) {
                    if (user.get(id) == id) {
                        col.remove(user);
                        return;
                    }
                });
            }
        };
    });

    return AppManager.ContactsApp.List.Controller;
});
