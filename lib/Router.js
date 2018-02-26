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

Router.route('/store/:_storeId/:_itemId', function () {
    this.render('store_item_index', {
        data: function () {
            Meteor.subscribe('shopItems', this.params._storeId);
            
            if(Shops.find({_id: this.params._storeId}).fetch().length < 1){
                this.redirect('/home');
            };
            if(Items.find({_id: this.params._itemId}).fetch().length < 1){
                this.redirect('/home');
            };
            
            return {
                item: Items.findOne({_id: this.params._itemId}),
                store: Shops.findOne({_id: this.params._storeId})
            };
        }

    });
});

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
