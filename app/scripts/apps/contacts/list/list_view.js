define(["app",
        "hbs!apps/contacts/list/templates/contactList_tmpl", 
        "hbs!apps/contacts/list/templates/user_tmpl"],
        function(AppManager, ContactListTpl, UserTpl){
    AppManager.module("ContactsApp.List.View", function(View, AppManager, Backbone, Marionette, $, _){
        View.UserView = Backbone.Marionette.ItemView.extend({  
            template: UserTpl,
            className: 'panel panel-default single-contact',

            events: {
                'click #start-conversation-btn': 'startConversation'
            },

            startConversation: function () {
                this.trigger('conversation:start', this.model)
            }
        });

        View.ContactsView = Backbone.Marionette.CompositeView.extend({
            itemView: View.UserView,
            className: 'jumbotron variable-height',
            template: ContactListTpl,
            itemViewContainer: "#contact-list-container"
            
        });
    });

    return AppManager.ContactsApp.List.View;
});
