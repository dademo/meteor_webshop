import './store_storeMenu.html';

Template.store_storeMenu.helpers({
    isStore: function (pageType) {
        if (pageType !== 'about') {
            return true;
        }
    },
    isAbout: function (pageType) {
        console.log(pageType);
        if (pageType === 'about') {
            return true;
        }
    }
});