
Router.configure({
    layoutTemplate: 'AppLayout'
});


Router.route('/', function () {
    this.redirect('/home');
});

Router.route('/home', function () {
    this.render('home_index', {
        data: function () {
            return {
                msg: 'Hello World !'
            };
        }
    });
});


Router.route('/contact', function () {
    this.render('contact_index', {

    });
});

Router.route('/basket', function () {
    this.render('basket_index', {

    });
});


Router.route('/signin', function() {
    this.layout('VoidLayout');
    this.render('user_signin', {
        
    });
});