import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';

Template.user_signin.events({
    'submit form': function (event) {
        event.preventDefault();
        var errors = [];
        var $form = $(event.target);

        var mail = $form.find('#f_email').val();
        var pass1 = $form.find('#f_password').val();
        var pass2 = $form.find('#f_password-confirm').val();

        // Check mail
        var mailList = [];
        Meteor.call("usersMailList", function (err, res) {
            if (!err) {
                mailList = res;

                if ($.inArray(mail, mailList) !== -1) {
                    errors.push('Cette adresse mail est déjà utilisée');
                }

                if (pass1 !== pass2) {
                    errors.push('Les deux mots de passes ne correspondent pas !');
                }

                if (errors.length != 0) {
                    var $list = $('<ul></ul>');
                    errors.forEach(function (error) {
                        var $elem = $('<li></li>');
                        $elem.text(error);
                        $list.append($elem);
                    });
                    $form.find('#error-list').html('');
                    $form.find('#error-list').append($list);
                    $form.find('#error-list').removeClass('hidden');
                } else {
                    $form.find('#error-list').html('');
                    $form.find('#error-list').addClass('hidden');
                    console.log("Form submitted.");
                    Meteor.call('register_user', {userMail: mail, userPassword: pass1}, function (err, res) {
                        Router.go('/');
                    });
                }
            }
        });
    }
});