import { Meteor } from 'meteor/meteor';
import '../imports/collections';

Products.allow({

	insert: function (userId, doc) {

		// if(!userId) return;
    //
		// if(!Util.isAdmin(userId)) return;

		return true;

	},

	update: function (userId, doc) {

		// if(!userId) return;
    //
		// const user = Meteor.users.findOne(userId);
		// if(user.admin) return true;

		const product = Products.findOne({
			_id: doc._id,
		});

		if(!product) return;

		return true;

	},

	remove: function (userId, doc) {
		// return Util.isAdmin(userId);
    return true;
	}

});
