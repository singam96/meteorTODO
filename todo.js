
Tasks = new Mongo.Collection("todo");

if (Meteor.isClient) {

	Template.thecalendar.rendered = function() {
    this.$('.datepicker').datepicker();
}


  Template.body.helpers({
    tasks: function() {
		return Tasks.find({username: Meteor.user().username});
	}
  });

  Template.add.events({
    'click button': function () {
			this.$('.datetimepicker').datetimepicker();
    }
  });
	  Template.body.events({
    "submit .add-todo": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      var text = event.target.text.value;
			var date = event.target.date.value;
			var location = event.target.location.value;
			if(Boolean(text)){
      // Insert a task into the collection
      Tasks.insert({
        date: date,
        text: text,
				location: location,
				owner: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username  // username of logged in user

      });
			}
      // Clear form
      event.target.date.value = "";
			event.target.text.value = "";
			event.target.location.value = "";
    }
  });

	  Template.body.events({
    "click .delete": function () {
      Tasks.remove(this._id);
    }
});
  Accounts.ui.config({

    passwordSignupFields: "USERNAME_ONLY"

  });

}

if (Meteor.isServer) {

		//Tasks.remove({});
    // code to run on server at startup
}
