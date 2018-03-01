import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);


Shops = new Mongo.Collection('shops');

Shops.allow({
    insert: function () {
        return true;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return false;
    }
});


const Schema = {};

Schema.location = new SimpleSchema({
    latitude: {
        type: Number,
        label: 'Latitude',
        optional: true
    },
    longitude: {
        type: Number,
        label: 'Longitude',
        optional: true
    }
});

Shops.attachSchema(new SimpleSchema({
    _owner: {
        type: String,
        max: 24,
        autoform: {
            omit: true
        }
    },
    name: {
        type: String,
        label: 'Nom de la boutique',
        max: 200
    },
    address: {
        type: String,
        label: 'Adresse de la boutique',
        max: 200
    },
    telephone: {
        type: String,
        label: 'Téléphone de la boutique',
        max: 10
    },
    schedules: {// Liste des horaires d'ouverture
        type: Array,
        label: 'Horaires d\'ouverture'
    },
    'schedules.$': {// Les éléments contenus sont des objets
        type: Object,
        label: 'Horaire d\'ouverture'
    },
    'schedules.$.dDay': {// Jour de la semaine
        type: Number,
        label: 'Jour de la semaine',
        allowedValues: [0, 1, 2, 3, 4, 5, 6],
        autoform: {
            options: {
                0: 'Lundi',
                1: 'Mardi',
                2: 'Mercredi',
                3: 'Jeudi',
                4: 'Vendredi',
                5: 'Samedi',
                6: 'Dimanche'
            }
        }
    },
    'schedules.$.begin': {// Début pour la date courante
        type: 'datetime',
        label: 'Heure de début'
    },
    'schedules.$.end': {// Fin pour la date courante
        type: 'datetime',
        label: 'Heure de fin'
    },
    img_banner: {// Chemin de la bannière dans le serveur
        type: String,
        label: 'Bannière du magasin',
        autoValue: function () {
            return 'http://placehold.it/700x400';
        }
    },
    description: {
        type: String,
        label: 'Description du magasin',
        optional: true
    },
    location: {
        type: Schema.location,
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
