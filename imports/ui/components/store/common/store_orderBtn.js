import './store_orderBtn.html';

Template.store_orderBtn.events({
    'click #btn-plus': function (e) {
        var $elem = $(e.delegateTarget).find('#nElems')
        var itemId = (this.item) ? this.item._id : this._id;
        //console.log(this);  // -> Object
        //console.log(e); // -> Utiliser delegateTarget qui donne la div autours
        $elem.val(Blaze._globalHelpers['addItemInBasket'].call(null, itemId));
    },
    'click #btn-minus': function (e) {
        var $elem = $(e.delegateTarget).find('#nElems')
        var itemId = (this.item) ? this.item._id : this._id;
        //console.log(this);  // -> Object
        //console.log(e); // -> Utiliser delegateTarget qui donne la div autours
        $elem.val(Blaze._globalHelpers['delItemInBasket'].call(null, itemId));
    },
    'keyup #nElems': function (e) {
        var $elem = $(e.delegateTarget).find('#nElems');
        var itemId = (this.item) ? this.item._id : this._id;
        $elem.val(Blaze._globalHelpers['setItemInBasket'].call(null, itemId, $elem.val()));
    },
    'click #bt-addToBasket': function (e) {
        var itemId = (this.item) ? this.item._id : this._id;
        Blaze._globalHelpers['addItemInBasket'].call(null, itemId);
    }
});

//see: Template.tplName.__helpers.get('helper').call()
Template.store_orderBtn.helpers({
    'isInBasket': function () {
        // inBasketCount
        // Blaze._globalHelpers['inBasketCount'].call();
        // Blaze._globalHelpers['inBasketCount'].call();

        var itemId = (this.item) ? this.item._id : this._id;

        // Le premier paramètre n'est pas utilisé
        if (Blaze._globalHelpers['inBasketCount'].call(null, itemId) > 0) {
            return true;
        } else {
            return false;
        }
    },
    'getItemId': function () {
        return (this.item) ? this.item._id : this._id;
    }
});