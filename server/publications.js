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

Meteor.publish('users', function () {
    return Meteor.users.find({});
});
