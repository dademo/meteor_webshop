import { Meteor } from 'meteor/meteor';

Meteor.publish('shopsList', function() {
    return Shops.find();
})