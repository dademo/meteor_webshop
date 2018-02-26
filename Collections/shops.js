import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';


Shops = new Mongo.Collection('shops');

Shops.allow({
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

Shops.attachSchema(new SimpleSchema({
    _owner: {
        type: String,
        max: 24
    },
    name: {
        type: String,
        max: 200
    },
    address: {
        type: String,
        max: 200
    },
    telephone: {
        type: String,
        max: 10
    },
    schedules: {// Liste des horaires d'ouverture
        type: Array
    },
    'schedules.$': {// Les éléments contenus sont des objets
        type: Object
    },
    'schedules.$.dDay': {// Jour de la semaine
        type: Number
    },
    'schedules.$.begin': {// Début pour la date courante
        type: Date
    },
    'schedules.$.end': {// Fin pour la date courante
        type: Date
    },
    img_banner: {// Chemin de la bannière dans le serveur
        type: String,
        autoValue: function () {
            return 'http://placehold.it/700x400';
        }
    },
    description: {
        type: String,
        optional: true
    }
}));

function modifShop(shop) {
    if (shop.hasOwnProperty('owner')) {    // On affecte l'élément _owner pour l'insertion en BDD
        shop._owner = shop.owner._id;
        delete shop.owner;
    }
    return shop;
}


Meteor.methods({
    'addShop': function (shop, callback) {
        return Shops.insert(modifShop(shop), callback);
    },
    'updateShop': function (shop, modifier, ...optionsAndCallback) {
        return Shops.update(modifShop(shop), modifier, optionsAndCallback);
    },
    'findShop': function (...args) {
        var allResults = [];
        var cursor = null;
        if (args.length === 0) {
            cursor = Shops.find();
        } else if (args.length === 1) {
            cursor = Shops.find(args[0]);
        } else if (args.length === 2) {
            cursor = Shops.find(args[0], args.length[1]);
        } else {
            // Non-implémenté
        }

        if (cursor) {
            cursor.forEach(function (shop) {
                if (shop.hasOwnProperty('_owner')) {
                    shop.owner = Meteor.users.findOne({_id: shop._owner});
                }
                allResults.push(shop);
            });
        }
        return allResults;
    },
    'findOneShop': function (...args) {
        var shop = null;
        if (args.length === 0) {
            shop = Shops.findOne();
        } else if (args.length === 1) {
            shop = Shops.findOne(args[0]);
        } else if (args.length === 2) {
            shop = Shops.findOne(args[0], args.length[1]);
        } else {
            // Non-implémenté
        }
        if (shop) {
            if (shop.hasOwnProperty('_owner')) {
                shop.owner = Meteor.users.findOne({_id: shop._owner});
            }
        }
        return shop;
    }
});

// On règle la boutique associée à l'objet
Shops.before.insert(function (userId, shop) {
    if (shop.hasOwnProperty('owner')) {    // On affecte l'élément _owner pour l'insertion en BDD
        shop._owner = shop.owner._id;
        delete shop.owner;
    }
});

Shops.before.update(function (userId, item, fieldNames, modifier, options) {
    if (modifier.hasOwnProperty('owner')) {
        modifier._owner = modifier.owner._id;
        delete modifier.owner;
    }
    if (modifier.$set.hasOwnProperty('owner')) {
        modifier.$set._owner = modifier.$set.owner._id;
        delete modifier.$set.owner;
    }
    if (modifier.$unset.hasOwnProperty('owner')) {
        modifier.$unset._owner = modifier.$unset.owner._id;
        delete modifier.$unset.owner;
    }
});

Shops.before.upsert(function (userId, selector, modifier, options) {
    if (modifier.$set.hasOwnProperty('owner')) {
        modifier.$set._owner = modifier.$set.owner._id;
        delete modifier.$set.owner;
    }
});

Shops.after.find(function (userId, selector, options, cursor) {
    if (Array.isArray(cursor)) {
        cursor.forEach(function (item) {
            if (item.hasOwnProperty('_owner')) {
                item.owner = Meteor.users.findOne({_id: item._owner});
            }
        });
    }
});

Shops.after.findOne(function (userId, selector, options, shop) {
    if (shop) {
        if (shop.hasOwnProperty('_owner')) {
            shop.owner = Meteor.users.findOne({_id: shop._owner});
        }
    }
});
