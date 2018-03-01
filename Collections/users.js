import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';


SimpleSchema.extendOptions(['index', 'unique', 'denyInsert', 'denyUpdate']);


const Schema = {};

Meteor.users.allow({
    update: function (userId, doc, fields, modifier) {
        return true;
    }
});

Schema.userProfile = new SimpleSchema({
    firstName: {
        type: String,
        label: 'Prénom',
        optional: true
    },
    lastName: {
        type: String,
        label: 'Nom de famille',
        optional: true
    },
    birthDate: {
        type: Date,
        label: 'Date de naissance',
        optional: true
    },
    address: {
        type: String,
        label: 'Adresse',
        optional: true
    }
});


Schema.User = new SimpleSchema({
    username: {
        type: String,
        optional: true,
        autoform: {
            omit: true
        }
    },
    emails: {
        type: Array,
        autoform: {
            minCount: 1
        }
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: 'Adresse e-mail'
    },
    "emails.$.verified": {
        type: Boolean,
        autoform: {
            omit: true
        },
        autoValue: function(){
            return false;
        }
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else {
                this.unset();
            }
        }
    },
    profile: {
        type: Schema.userProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true,
        autoform: {
            omit: true
        }
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    /*roles: {
     type: Object,
     optional: true,
     blackbox: true
     },*/
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: Array,
        optional: true,
        autoform: {
            omit: true
        }
    },
    'roles.$': {
        type: String
    },
});

Meteor.users.attachSchema(Schema.User);