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
        optional: true
    }
}));