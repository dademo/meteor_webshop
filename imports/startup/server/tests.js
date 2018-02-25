import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

//Meteor.users.create()

//import '../../../Collections/shops.js';

Items.remove({});
Orders.remove({});
Shops.remove({});
Meteor.users.remove({});

var userId = Accounts.createUser({
    username: 'dademo',
    email: 'dev.damien.demonaz@gmail.com',
    password: 'azerty',
    profile: {
        firstName: 'Damien',
        lastName: 'DEMONAZ',
        adress: '19bis rue Mathurin Régnier',
        birthDate: new Date(1998, 7, 29)
    }
});

var shop_id = Meteor.call('addShop', {
    owner: Accounts.findUserByEmail('dev.damien.demonaz@gmail.com'),
    name: 'TestShop',
    address: 'Test',
    telephone: '0605257946',
    schedules: [{
            dDay: 0,
            begin: new Date(0, 0, 0, 8, 0, 0),
            end: new Date(0, 0, 0, 19, 0, 0)
        }],
    img_banner: '',
    description: 'La première boutique !'
});


var shop2_id = Meteor.call('addShop', {
    owner: Accounts.findUserByEmail('dev.damien.demonaz@gmail.com'),
    name: 'Shop2',
    address: 'Test',
    telephone: '0605257946',
    schedules: [{
            dDay: 0,
            begin: new Date(0, 0, 0, 8, 0, 0),
            end: new Date(0, 0, 0, 19, 0, 0)
        }],
    img_banner: '',
    description: 'La deuxième boutique !'
});

/*
var shop_id = Shops.insert({
    _owner: Accounts.findUserByEmail('dev.damien.demonaz@gmail.com')._id,
    name: 'TestShop',
    address: 'Test',
    telephone: '0605257946',
    schedules: [{
            dDay: 0,
            begin: new Date(0, 0, 0, 8, 0, 0),
            end: new Date(0, 0, 0, 19, 0, 0)
        }],
    img_banner: ''
});



var shop2_id = Shops.insert({
    _owner: Accounts.findUserByEmail('dev.damien.demonaz@gmail.com')._id,
    name: 'Shop2',
    address: 'Test',
    telephone: '0605257946',
    schedules: [{
            dDay: 0,
            begin: new Date(0, 0, 0, 8, 0, 0),
            end: new Date(0, 0, 0, 19, 0, 0)
        }],
    img_banner: ''
});*/

var item_id = Meteor.call('addItem', {
    shop: Shops.findOne({_id: shop_id}),
    name: 'Item Test',
    description: 'Un item de test',
    price: 0.90,
    remaining: -1,
    img: '',
    shop_front: true
});

var item2_id = Meteor.call('addItem', {
    _shop: shop_id,
    name: 'Item Test 2',
    description: 'Un deuxième item de test',
    price: 1.00,
    remaining: 10,
    img: '',
    shop_front: false
});

var item3_id = Meteor.call('addItem', {
    _shop: shop_id,
    name: 'Item Test 3',
    description: 'Un troisième item de test',
    price: 1.99,
    remaining: 100,
    img: '',
    shop_front: false
});

//console.log(Items.find({_shop: shop_id}).fetch());
//console.log(Meteor.call('findItem', {_shop: shop_id}));