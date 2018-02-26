import { Meteor }
from 'meteor/meteor';
import { Template }
from 'meteor/templating';
import { Session }
from 'meteor/session';

/*
 * Object: {
 *  item: Object (Collection),
 *  count: #int#
 * }
 */
Session.set('basket', []);

function getInBasketId(itemId) {
    var _index = null;
    Session.get('basket').forEach(function (elem, index) {
        if (elem.itemId === itemId) {
            _index = index;
        }
    });
    return _index;
}


Template.registerHelper('userMail', function () {

    return  Meteor.user().emails[0].address;

});

Template.registerHelper('shopsList', function () {
    return Shops.find().fetch();
});

Template.registerHelper('itemsList', function () {
    return Items.find().fetch();
});

Template.registerHelper('inBasketCount', function (itemId) {
    var index = getInBasketId(itemId);
    if (index != null) {
        return Session.get('basket')[index].count;
    } else {
        return null;
    }
});

Template.registerHelper('addItemInBasket', function (itemId) {
    var basket = Session.get('basket');
    var index = getInBasketId(itemId);
    if (index != null) {
        basket[index].count++;
        Session.set('basket', basket);
        return basket[index].count;
    } else {
        basket.push({
            itemId: itemId,
            count: 1
        });
        Session.set('basket', basket);
        return 1;
    }
});

Template.registerHelper('delItemInBasket', function (itemId) {
    var basket = Session.get('basket');
    var index = getInBasketId(itemId);
    if (index!= null) {
        basket[index].count--;
        if (basket[index].count === 0) {
            basket.splice(index, 1); // On enlève l'élément de la BDD
            Session.set('basket', basket);
            return null;
        } else {
            Session.set('basket', basket);
            return basket[index].count;
        }
    } else {
        return null;
    }
});

Template.registerHelper('setItemInBasket', function (itemId, count) {
    var basket = Session.get('basket');
    var index = getInBasketId(itemId);
    if (index != null) {
        basket[index].count = count;
        if (basket[index].count == 0) {
            basket.splice(index, 1); // On enlève l'élément de la BDD
            Session.set('basket', basket);
            return null;
        } else {
            Session.set('basket', basket);
            return basket[index].count;
        }
    } else {
        basket.push({
            itemId: itemId,
            count: 1
        });
        Session.set('basket', basket);
        return 1;
    }
});

Template.registerHelper('shopsList', function(){
    return Shops.find().fetch();
});

Template.registerHelper('itemsList', function(){
    return Items.find().fetch();
});
