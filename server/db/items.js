import { Meteor } from 'meteor/meteor';

Meteor.publish('shopItems', function (shopId) {
    return Items.find({_shop: shopId});
});