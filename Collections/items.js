import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

Items = new Mongo.Collection('items');

Items.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});

Items.attachSchema(new SimpleSchema({
    _shop: {
        type: String,
        max: 24
    },
    name: {
        type: String,
        max: 100
    },
    description: {
        type: String,
        max: 500,
        optional: true
    },
    price: {
        type: Number,
        min: 0
    },
    remaining: {// if == -1, <=> Infinite
        type: Number,
        min: -1
    },
    img: {
        type: String,
        autoValue: function () {
            return 'http://placehold.it/700x400';
        }
    },
    shop_front: {
        type: Boolean,
        autoValue: function () {
            return false;
        }
    }
}));

function modifItem(item) {
    if (item.hasOwnProperty('shop')) {    // On affecte l'élément _owner pour l'insertion en BDD
        item._shop = item.shop._id;
        delete item.shop;
    }
    return item;
}


Meteor.methods({
    'addItem': function (item, callback) {
        return Items.insert(modifItem(item), callback);
    },
    'updateItem': function (item, modifier, ...optionsAndCallback) {
        return Items.update(modifItem(item), modifier, optionsAndCallback);
    },
    'findItem': function (...args) {
        var allResults = [];
        var cursor = null;
        if (args.length === 0) {
            cursor = Items.find();
        } else if (args.length === 1) {
            cursor = Items.find(args[0]);
        } else if (args.length === 2) {
            cursor = Items.find(args[0], args.length[1]);
        } else {
            // Non-implémenté
        }

        if (cursor) {
            cursor.forEach(function (item) {
                if (item.hasOwnProperty('_shop')) {
                    item.shop = Shops.findOne({_id: item._shop});
                }
                allResults.push(item);
            });
        }
        return allResults;
    },
    'findOneItem': function (...args) {
        var item = null;
        if (args.length === 0) {
            item = Items.findOne();
        } else if (args.length === 1) {
            item = Items.findOne(args[0]);
        } else if (args.length === 2) {
            item = Items.findOne(args[0], args.length[1]);
        } else {
            // Non-implémenté
        }
        if (item) {
            if (item.hasOwnProperty('_shop')) {
                item.shop = Shops.findOne({_id: item._shop});
            }
        }
        return item;
    }
});

// On règle la boutique associée à l'objet
Items.before.insert(function (userId, item) {
    if (item.hasOwnProperty('shop')) {    // On affecte l'élément _shop pour l'insertion en BDD
        item._shop = item.shop._id;
        delete item.shop;
    }
});

Items.before.update(function (userId, item, fieldNames, modifier, options) {
    if (modifier.hasOwnProperty('shop')) {
        modifier._shop = modifier.shop._id;
        delete modifier.shop;
    }
    if (modifier.$set.hasOwnProperty('shop')) {
        modifier.$set._shop = modifier.$set.shop._id;
        delete modifier.$set.shop;
    }
    if (modifier.$unset.hasOwnProperty('shop')) {
        modifier.$unset._shop = modifier.$unset.shop._id;
        delete modifier.$unset.shop;
    }
});

Items.before.upsert(function (userId, selector, modifier, options) {
    if (modifier.$set.hasOwnProperty('shop')) {
        modifier.$set._shop = modifier.$set.shop._id;
        delete modifier.$set.shop;
    }
});

Items.after.find(function (userId, selector, options, cursor) {
    /*if (Array.isArray(cursor)) {
     cursor.forEach(function (item) {
     if (item.hasOwnProperty('_shop')) {
     item.shop = Shops.findOne({_id: item._shop});
     }
     });
     } else {
     
     }*/
});

Items.after.findOne(function (userId, selector, options, item) {
    /*if (item.hasOwnProperty('_shop')) {
     item.shop = Shops.findOne({_id: item._shop});
     }*/
});