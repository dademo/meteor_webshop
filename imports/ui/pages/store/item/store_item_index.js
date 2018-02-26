import './store_item_index.html';


Template.store_item_index.helpers({
    'isNotInfinite': function(){
        if(this.item && this.item.remaining == -1){
            return false;
        } else {
            return true;
        }
    }
});