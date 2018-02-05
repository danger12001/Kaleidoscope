import { Meteor } from 'meteor/meteor';
import '../imports/collections';

Cloudinary.config({

	cloud_name: 'dlf2sfprr',
	api_key: '275182636792454',
	api_secret: 'wI_BopYP_QGCh-9PTwb5cyC8O6s',
})

Meteor.startup(function() {
	process.env.MAIL_URL = "smtp://robertsonpsd@gmail.com:55501211@smtp.gmail.com:587/"
})


// # Rules are all optional
// Cloudinary.rules.delete = ;
	// @userId is "my_user_id" # The rule must return true to pass validation, if you do not set a rule, the validation will always pass
	// @public_id # The public_id that is being deleted

// Cloudinary.rules.signature =  -> # This one checks whether the user is allowed to upload or not
	// @userId is "my_user_id" # The rule must return true to pass validation, if you do not set a rule, the validation will always pass

// Cloudinary.rules.private_resource = ->
	// @userId is "my_user_id" # The rule must return true to pass validation, if you do not set a rule, the validation will always pass

// Cloudinary.rules.download_url = ->
	// @userId is "my_user_id" # The rule must return true to pass validation, if you do not set a rule, the validation will always pass



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

Checkout.allow({

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

		const checkout = Checkout.findOne({
			_id: doc._id,
		});

		if(!checkout) return;

		return true;

	},

	remove: function (userId, doc) {
		// return Util.isAdmin(userId);
    return true;
	}

});
