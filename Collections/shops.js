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