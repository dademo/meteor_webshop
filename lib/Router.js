Router.configure({
    layoutTemplate: 'AppLayout',
    subscriptions: function () {
        return [
            Meteor.subscribe("shopsList")
        ];
    }
});


Router.route('/', function () {
    this.redirect('/home');
});

Router.route('/home', function () {
    Meteor.subscribe('shopsList');
    this.render('home_index', {
        // ...
    });
});

Router.route('/store/:_storeId', function () {
    this.render('store_home_index', {
        data: function () {
            Meteor.subscribe('shopItems', this.params._storeId);
            
            if(Shops.find({_id: this.params._storeId}).fetch().length < 1){
                this.redirect('/home');
            }
            
            return {

            };
        },
        onBeforeAction: function () {

        },
        waitOn: function () {
            // Ne semble pas fonctionner ici, -> dans data()
            /*return [
                Meteor.subscribe('shopItems', this.params._storeId)
            ];*/
        }

    });
});

//Meteor.subscribe('shopItems', shopId);
//Shops.find().fetch()


Router.route('/contact', function () {
    this.render('contact_index', {
        // ...
    });
});

Router.route('/basket', function () {
    this.render('basket_index', {
        // ...
    });
});


Router.route('/signin', function () {
    this.layout('VoidLayout');
    this.render('user_signin', {
        // ...
    });
});