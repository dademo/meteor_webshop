import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';

Template.tpl_login.events({
    'submit form': function (event) {
        event.preventDefault();
        var $form = $(event.target);

        var mail = $form.find('#login_mail').val();
        var password = $form.find('#login_password').val();

        Meteor.loginWithPassword(mail, password, function (err) {
            if (err) {
                $error = $('<p></p>');
                $error.text(err.reason)
                $form.find('#login-error').html('');
                $form.find('#login-error').append($error);
                $form.find('#login-error').removeClass('hidden');
            } else {
                $form.find('#login-error').html('');
                $form.find('#login-error').addClass('hidden');
            }
        });
    }
});