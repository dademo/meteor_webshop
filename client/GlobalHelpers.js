import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.registerHelper('helloWorld', function () {
    return '<p>Hello World !</p>'
});

Template.registerHelper('userMail', function(){

    return  Meteor.user().emails[0].address;

});

Template.registerHelper('shopsList', function(){
    return Shops.find().fetch();
});

Template.registerHelper('itemsList', function(){
    return Items.find().fetch();
});