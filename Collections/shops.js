import { Meteor } from 'meteor/meteor';
Shops = new Mongo.Collection('shops');

Shops.allow({
    insert: function(){
        return true;
    },
    update: function() {
        return true;
    },
    remove: function(){
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
    schedules: {             // Liste des horaires d'ouverture
        type: Array
    },
    'schedules.$': {    // Les éléments contenus sont des objets
        type: Object
    },
    'schedules.$.dDay': {   // Jour de la semaine
        type: Number
    },
    'schedules.$.begin': {  // Début pour la date courante
        type: Date
    },
    'schedules.$.end': {    // Fin pour la date courante
        type: Date
    },
    img_banner: {   // Chemin de la bannière dans le serveur
        type: String,
        optional: true
    }
}));

// On règle la boutique associée à l'objet
Shops.before.insert(function (userId, item) {
    if (item.hasOwnProperty('owner')) {    // On affecte l'élément _owner pour l'insertion en BDD
        item._ownerp = item.owner._id;
        delete item.owner;
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
    cursor.each(function (err, item) {
        if (item.hasOwnProperty('_owner')) {
            item.owner = Meteor.users.findOne({_id: item._owner});
        }
    });
});

Shops.after.findOne(function (userId, selector, options, item) {
    if (item.hasOwnProperty('_owner')) {
        item.owner = Meteor.users.findOne({_id: item._owner});
    }
});