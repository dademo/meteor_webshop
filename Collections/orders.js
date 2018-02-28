import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['index', 'unique', 'denyInsert', 'denyUpdate', 'autoform']);


Orders = new Mongo.Collection('orders');
Orders.allow({
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
Orders.attachSchema(new SimpleSchema({
    _items: {
        type: Array
    },
    '_items.$': {
        type: String,
        max: 24
    },
    _user: {
        type: String,
        max: 24
    },
    orderDate: {
        type: Date,
        label: 'Date de la commande',
        denyUpdate: true,
        autoValue: function () {
            return new Date();
        },
        autoform: { // Ne soit pas apparaitre dans le formulaire
            omit: true
        }
    },
    withdrawalDate: {// Withdrawal date of the item
        type: Date,
        label: 'Date de réception de la commande'
    }
}));

function modifOrder(order) {
    if (order.hasOwnProperty('items') && Array.isArray(order.items)) {    // On affecte l'élément _items pour l'insertion en BDD
        // Items
        var _items = [];
        order.items.forEach(function (element) {  // On peuple la liste des items
            _items.push(element._id);
        });
        order._items = _items;
        delete order.items;
    }
    if (order.hasOwnProperty('user')) {
        // User
        order._user = order.user._id;
        delete order.user;
    }
    return order;
}


Meteor.methods({
    'addOrder': function (order, callback) {
        return Orders.insert(modifOrder(order), callback);
    },
    'updateOrder': function (order, modifier, ...optionsAndCallback) {
        return Orders.update(modifOrder(order), modifier, optionsAndCallback);
    },
    'findOrder': function (...args) {
        var allResults = [];
        var cursor = null;
        if (args.length === 0) {
            cursor = Orders.find();
        } else if (args.length === 1) {
            cursor = Orders.find(args[0]);
        } else if (args.length === 2) {
            cursor = Orders.find(args[0], args.length[1]);
        } else {
            // Non-implémenté
        }

        if (cursor) {
            cursor.forEach(function (order) {
                if (order.hasOwnProperty('_items')) {
                    // Items
                    var _items = [];
                    order.items.forEach(function (element) {  // On peuple la liste des items
                        _items.push(element._id);
                    });
                    order._items = _items;
                }

                if (order.hasOwnProperty('_user')) {
                    order.user = Meteor.users.findOne({_id: order._user});
                }
            });
        }
        return allResults;
    },
    'findOneOrder': function (...args) {
        var order = null;
        if (args.length === 0) {
            order = Orders.findOne();
        } else if (args.length === 1) {
            order = Orders.findOne(args[0]);
        } else if (args.length === 2) {
            order = Orders.findOne(args[0], args.length[1]);
        } else {
            // Non-implémenté
        }
        if (order) {
            if (order.hasOwnProperty('_items')) {
                // Items
                var _items = [];
                order.items.forEach(function (element) {  // On peuple la liste des items
                    _items.push(element._id);
                });
                order._items = _items;
            }

            if (order.hasOwnProperty('_user')) {
                order.shop = Meteor.users.findOne({_id: order._user});
            }
        }
        return order;
    }
});


// On règle la boutique associée à l'objet
Orders.before.insert(function (userId, order) {
    if (order.hasOwnProperty('items') && Array.isArray(order.items)) {    // On affecte l'élément _items pour l'insertion en BDD
        // Items
        var _items = [];
        order.items.forEach(function (element) {  // On peuple la liste des items
            _items.push(element._id);
        });
        order._items = _items;
        delete order.items;
    }
    if (order.hasOwnProperty('user')) {
        // User
        order._user = order.user._id;
        delete order.user;
    }
});

Orders.before.update(function (userId, order, fieldNames, modifier, options) {
    // Items //
    if (modifier.hasOwnProperty('items')) {
        // Items
        var _items = [];
        modifier.items.forEach(function (element) {  // On peuple la liste des items
            _items.push(element._id);
        });
        modifier._items = _items;
        delete modifier.items;
    }
    if (modifier.$set.hasOwnProperty('items')) {
        // Items
        var _items = [];
        modifier.$set.items.forEach(function (element) {  // On peuple la liste des items
            _items.push(element._id);
        });
        modifier.$set._items = _items;
        delete modifier.$set.items;
    }
    if (modifier.$unset.hasOwnProperty('items')) {
        // Items
        var _items = [];
        modifier.$unset.items.forEach(function (element) {  // On peuple la liste des items
            _items.push(element._id);
        });
        modifier.$unset._items = _items;
        delete modifier.$unset.items;
    }

    // User //
    if (modifier.hasOwnProperty('user')) {
        modifier._user = modifier.user._id;
        delete modifier.user;
    }
    if (modifier.$set.hasOwnProperty('user')) {
        modifier.$set._user = modifier.$set.user._id;
        delete modifier.$set.user;
    }
    if (modifier.$unset.hasOwnProperty('user')) {
        modifier.$unset._user = modifier.$unset.user._id;
        delete modifier.$unset.user;
    }
});

Orders.before.upsert(function (userId, selector, modifier, options) {
    // Items //
    if (modifier.hasOwnProperty('items')) {
        // Items
        var _items = [];
        modifier.items.forEach(function (element) {  // On peuple la liste des items
            _items.push(element._id);
        });
        modifier._items = _items;
        delete modifier.items;
    }
    if (modifier.$set.hasOwnProperty('items')) {
        // Items
        var _items = [];
        modifier.$set.items.forEach(function (element) {  // On peuple la liste des items
            _items.push(element._id);
        });
        modifier.$set._items = _items;
        delete modifier.$set.items;
    }
    if (modifier.$unset.hasOwnProperty('items')) {
        // Items
        var _items = [];
        modifier.$unset.items.forEach(function (element) {  // On peuple la liste des items
            _items.push(element._id);
        });
        modifier.$unset._items = _items;
        delete modifier.$unset.items;
    }

    // User //
    if (modifier.hasOwnProperty('user')) {
        modifier._user = modifier.user._id;
        delete modifier.user;
    }
    if (modifier.$set.hasOwnProperty('user')) {
        modifier.$set._user = modifier.$set.user._id;
        delete modifier.$set.user;
    }
    if (modifier.$unset.hasOwnProperty('user')) {
        modifier.$unset._user = modifier.$unset.user._id;
        delete modifier.$unset.user;
    }
});

Orders.after.find(function (userId, selector, options, cursor) {
    if (Array.isArray(cursor)) {
        cursor.forEach(function (order) {
            if (order.hasOwnProperty('_items')) {
                // Items
                var _items = [];
                order.items.forEach(function (element) {  // On peuple la liste des items
                    _items.push(element._id);
                });
                order._items = _items;
            }

            if (order.hasOwnProperty('_user')) {
                order.user = Meteor.users.findOne({_id: order._user});
            }
        });
    }
});

Orders.after.findOne(function (userId, selector, options, order) {
    if (order.hasOwnProperty('_items')) {
        // Items
        var _items = [];
        order.items.forEach(function (element) {  // On peuple la liste des items
            _items.push(element._id);
        });
        order._items = _items;
    }

    if (order.hasOwnProperty('_user')) {
        order.shop = Meteor.users.findOne({_id: order._user});
    }
});