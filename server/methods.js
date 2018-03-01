import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    'usersMailList': function () {
        var users = Meteor.users.find();
        var mailList = [];

        users.forEach(function (user) {
            user.emails.forEach(function (elem) {
                mailList.push(elem.address);
            });
        });

        return mailList;
    },
    'register_user': function ( {userMail, userPassword}) {
        var userId = Accounts.createUser({
            email: userMail,
            password: userPassword
        });

        Accounts.sendVerificationEmail(userId);
        return true;
    },
    'getUser': function (userMail) {
        return Accounts.findUserByEmail(userMail);
    },
    getShopOwnerMail: function (shopId) {
        if (shopId !== null) {
            var shop = Shops.findOne({_id: shopId});
            var owner = Meteor.users.findOne({_id: shop._owner});
            if (owner) {
                return owner.emails[0].address;
            } else {
                return '';
            }
        }
    }
});