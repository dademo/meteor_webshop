import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';

Template.menu_login.events({
    'click #logout': function (event) {
        event.preventDefault();
        
        Meteor.logout(function(err){
            console.log(err);
        });
    }
});