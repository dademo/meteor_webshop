import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['index', 'unique', 'denyInsert', 'denyUpdate']);


const Schema = {};

Schema.userProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    address: {
        type: String,
        optional: true
    }
});


Schema.User = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    emails: {
        type: Array
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date,
        denyUpdate: true,
        autoValue: function () {
            return new Date();
        }
    },
    profile: {
        type: Schema.userProfile,
        optional: true
    }
});

Meteor.users.attachSchema(Schema.User);