import './user_forgot.html';

Template.user_forgot.events({
    'submit form': function (event) {
        event.preventDefault();
        var errors = [];
        var $form = $(event.target);

        var mail = $form.find('#f_email').val();

        // Check mail
        var mailList = [];
        Meteor.call("usersMailList", function (err, res) {
            if (!err) {
                mailList = res;

                if ($.inArray(mail, mailList) === -1) {
                    errors.push('Cette adresse e-mail n\'est pas enregistrée sur notre service');
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
                    Accounts.forgotPassword({email: mail}, function (err) {
                        if (err) {
                            console.log('Impossible d\'envoyer la réinitialisation : ' + err);
                        } else {
                            Router.go('/');
                        }
                    });
                }
            }
        });
    }
});