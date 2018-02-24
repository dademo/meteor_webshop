import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

//Meteor.users.create()

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

Accounts.sendVerificationEmail(userId);

Accounts.sendResetPasswordEmail(userId);