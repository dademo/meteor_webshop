import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['index', 'unique', 'denyInsert', 'denyUpdate']);

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
        denyUpdate: true,
        autoValue: function () {
            return new Date();
        }
    },
    withdrawalDate: {// Withdrawal date of the item
        type: Date
    }
}));