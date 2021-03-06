Router.configure({
    layoutTemplate: 'AppLayout',
    subscriptions: function () {
        return [
            Meteor.subscribe("shopsList"),
            Meteor.subscribe("allItems")
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

            if (Shops.find({_id: this.params._storeId}).fetch().length < 1) {
                this.redirect('/home');
            }

            return {
                storeId: this.params._storeId,
                pageType: 'store'
            };
        }
    });
});

Router.route('/store/:_storeId/about', function () {
    if (Shops.find({_id: this.params._storeId}).fetch().length < 1) {
        this.redirect('/home');
    }

    this.render('store_home_about', {
        data: function () {
            return {
                storeId: this.params._storeId,
                store: Shops.findOne({_id: this.params._storeId}),
                pageType: 'about'
            };
        }
    });
});

Router.route('/store/:_storeId/:_itemId', function () {
    this.render('store_item_index', {
        data: function () {
            Meteor.subscribe('shopItems', this.params._storeId);

            if (Shops.find({_id: this.params._storeId}).fetch().length < 1) {
                this.redirect('/home');
            }
            ;
            if (Items.find({_id: this.params._itemId}).fetch().length < 1) {
                this.redirect('/store/' + this.params._storeId);
            }
            ;

            return {
                storeId: this.params._storeId,
                item: Items.findOne({_id: this.params._itemId}),
                store: Shops.findOne({_id: this.params._storeId}),
                pageType: 'item'
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


Router.route('/forgot', function () {
    this.layout('VoidLayout');
    this.render('user_forgot', {
        // ...
    });
});

Router.route('/profile', function () {
    if (!Meteor.userId()) {
        this.redirect('/home');
    }
    this.render('user_index', {
        data: function () {
            return {
                user: Meteor.user()
            }
        }
    });
});

Router.route('/user/store-create', function () {
    if (!Meteor.userId()) {
        this.redirect('/home');
    }
    
    var store = Shops.findOne({_owner: Meteor.userId()});
    
    this.render('user_store_create', {
        data: function () {
            return {
                user: Meteor.user(),
                store: store
            }
        }
    });
});