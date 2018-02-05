import { Meteor } from 'meteor/meteor';


Meteor.publish('products', function () {

	if(!this.userId) return [];
	return Products.find({}, {
		fields: {
			category: 1,
			products: 1,
		},
	});

});

Meteor.publish('checkout', function () {

	if(!this.userId) return [];
	
	return Checkout.find({}, {
		fields: {
			userId: 1,
			cart: 1,
		},
	});

});


Meteor.publish('users', function () {
    return Meteor.users.find({})

});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { other: 1, things: 1 }
    });
  } else {
    this.ready();
  }
});

// Meteor.startup(function() {
 Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };
// });
