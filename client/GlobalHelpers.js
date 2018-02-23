import { Template } from 'meteor/templating'

Template.registerHelper('helloWorld', function () {
    return '<p>Hello World !</p>'
});

Template.registerHelper('setAuthor', function(){

    return '<b>Bibi</b>';

});