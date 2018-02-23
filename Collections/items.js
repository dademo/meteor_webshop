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

// On règle la boutique associée à l'objet
Items.before.insert(function (userId, item){
    if(item.hasOwnProperty('shop')){    // On affecte l'élément _shop pour l'insertion en BDD
        item._shop = item.shop._id;
        delete item.shop;
    }
});

Items.before.update(function (userId, item, fieldNames, modifier, options) {
    if(modifier.$set.hasOwnProperty('shop')){
        modifier.$set._shop = modifier.$set.shop._id;
        delete modifier.$set.shop;
    }
});

Items.before.upsert(function (userId, selector, modifier, options) {
    if(modifier.$set.hasOwnProperty('shop')){
        modifier.$set._shop = modifier.$set.shop._id;
        delete modifier.$set.shop;
    }
});

Items.after.find(function (userId, selector, options, cursor) {
    cursor.each(function(err, item) {
        if(item.hasOwnProperty('_shop')){
            item.shop = Shops.findOne({_id: item._shop});
        }
    });
});

Items.after.findOne(function (userId, selector, options, item) {
    if(item.hasOwnProperty('_shop')){
            item.shop = Shops.findOne({_id: item._shop});
        }
});