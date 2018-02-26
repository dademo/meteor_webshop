import { Meteor } from 'meteor/meteor';

Meteor.publish('shopItems', function (shopId) {
    return Items.find({_shop: shopId});
});

Meteor.publish('allItems', function(){
    return Items.find({});
});