import './user_index.html';

Template.user_index.helpers({
    hasStore: function () {
        if (Shops.find({_owner: this.user._id}).count() > 0) {
            return true;
        } else {
            return false;
        }
    }
});