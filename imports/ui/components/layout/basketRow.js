import './basketRow.html';

Template.basketRow.events({
    'click .basketDel': function (e) {
        // Premier argument ignoré
        // Utiliser l'id de l'item ne fonctionne pas (bug JQuery, retourne une fausse valeur avec .data)
        Blaze._globalHelpers['rmBasketItem'].call(null, $(e.currentTarget).data('index'), 0);
    },
    'keyup .elem-count': function (e) {
        if ($(e.currentTarget).val() !== '') {
            Blaze._globalHelpers['byPos_setItemInBasket'].call(null, $(e.currentTarget).data('index'), $(e.currentTarget).val());
        }
    },
});