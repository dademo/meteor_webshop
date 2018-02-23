Router.route('/', function () {
    this.render('Home', {
        data: function () {
            return {
                msg: 'Hello World !'
            };
        }
    });
});

Router.route('/:_id', function () {
    console.log(this.params);
    this.render('HomeId', {
        data: function () {
            return {
                id: this.params._id,
            };
        }
    });
});
