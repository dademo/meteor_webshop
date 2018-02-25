import './home_index.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
/*
Template.home_index.helpers({
    shops: function(){
        shopList = [];
        Meteor.call('findShop', function(err, res){
            if(!err){
                shopList.push(res);
            }
        });
        return shopList;
    }
});*/