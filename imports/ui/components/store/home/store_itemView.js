import './store_itemView.html';

Template.store_itemView.helpers({
    'isNotInfinite': function () {
        if (this.remaining == -1) {
            return false;
        } else {
            return true;
        }
    }
});