import './user_store_create.html';

Template.user_store_create.events({
    'submit form': function (event) {
        console.log(event);
    }
});

Template.user_store_create.helpers({
  doc() {
    return { type: "simple" };
  }
});