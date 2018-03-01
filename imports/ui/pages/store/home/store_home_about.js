import './store_home_about.html';

Template.store_home_about.onRendered(function () {
    GoogleMaps.load({key: 'AIzaSyD6n8CBctSpdsGoyUews3ECwjMg0jmhZqI'});
});

Template.store_home_about.helpers({
    shopMapOptions: function () {
        
        var location = (this.store && this.store.location)? this.store.location : null;
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(
                        ((location && location.latitude) ? location.latitude : null),
                        ((location && location.longitude) ? location.longitude : null)
                        ),
                zoom: 15
            };
        }
    },
    getDay: function(dDay){
        switch(dDay){
            case 0:
                return 'Lundi';
            break;
            case 1:
                return 'Mardi';
            break;
            case 2:
                return 'Mercredi';
            break;
            case 3:
                return 'Jeudi';
            break;
            case 4:
                return 'Vendredi';
            break;
            case 5:
                return 'Samedi';
            break;
            case 6:
                return 'Dimanche';
            break;
            default:
                return '';
        };
    },
    myDate: function(mDate){
        return mDate.getHours().toLocaleString('fr-FR', {minimumIntegerDigits: 2, useGrouping:false}) + ':' + mDate.getMinutes().toLocaleString('fr-FR', {minimumIntegerDigits: 2, useGrouping:false});
    }
});

// ORT: 45.737987, 4.868040

Template.store_home_about.onCreated(function () {
    var data = this.data;
    var _this = this;
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('shopMap', function (map) {
        // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });

        var infowindow = new google.maps.InfoWindow({
            content: '<div><p>' + data.store.name + '</p></div>'
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });

        map.instance.addListener('click', function () {
            infowindow.close();
        });
    });
    
    Meteor.call('getShopOwnerMail', this.data.storeId, function(userMail){
        _this.data.ownerMail = userMail;
    });

});