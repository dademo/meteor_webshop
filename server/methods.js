import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    "usersMailList": function () {
        var users = Meteor.users.find();
        var mailList = [];

        users.forEach(function (user) {
            user.emails.forEach(function (elem) {
                mailList.push(elem.address);
            });
        });

        return mailList;
    },
    'register_user': function ({userMail, userPassword}) {
        console.log('Mail: ' + userMail);
        console.log('Password: ' + userPassword);
        var userId = Accounts.createUser({
            email: userMail,
            password: userPassword
        });
        
        Accounts.sendVerificationEmail(userId);
        return true;
    },
    'getUser': function (userMail) {
        return Accounts.findUserByEmail(userMail);
    }
});