import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';
import '../../collections';


import AppLayout from '../ui/AppLayout';
import Home from '../ui/Home';
import About from '../ui/About';
import NotFound from '../ui/NotFound';
import CategoriesView from '../ui/Categories';
import ProductsView from '../ui/Products';
import ProductsAdd from '../ui/products/Add';
import Settings from '../ui/Settings';
import Login from '../ui/Login';
import Signup from '../ui/Signup';
import ForgotPassword from '../ui/ForgotPassword';
import NewPassword from '../ui/NewPassword';
import Cart from '../ui/Cart';
import Payment from '../ui/Checkout';

$.cloudinary.config({

	cloud_name:"dlf2sfprr"
})

let passwordResetToken = ''


Accounts.onResetPasswordLink((token, done) => {

	console.log('reset')
	// passwordResetToken = token;
	FlowRouter.go(`/reset-password/${token}`);

})


Meteor.subscribe('users', function(){

	const users = Meteor.users.find({}).fetch();
		if(users && users.length === 0 ){
			Accounts.createUser({email: 'matthewjaybechus@gmail.com', password: 'Admin2017', profile: { admin: true}}, (response) => {
			})
		}
})




Accounts.onLogin(() => {
	let redirect = '/';

	if(Meteor.userId() && Meteor.user() && Meteor.user().profile.admin){
	 	redirect = 'settings';
	}

	const current = FlowRouter.current().route;

	if (redirect != null && redirect !== '/login') {

		return FlowRouter.go(redirect);

	} else if (current.group && current.group.name === 'exposed') {

		return FlowRouter.go('/');

	}

});

Accounts.onLogout(() => FlowRouter.go('login'));

const exposed = FlowRouter.group({
	name: 'exposed',
});


exposed.route('/', {
	name: 'home',
	action() {
		mount(AppLayout, {
			content: <Home />,
		});

	},
});

exposed.route('/settings', {
	name: 'settings',
	action(){
		if(Meteor.userId() && Meteor.user() && Meteor.user().profile.admin){
			const data = {products: Products};
			mount(AppLayout, {
				content: <Settings data={data} />,
			});
		} else {
			FlowRouter.go('/')
		}
	},
});

exposed.route('/about', {
	name: 'about',
	action() {

		mount(AppLayout, {
			content: <About />,
		});

	},
});

exposed.route('/products', {
	name: 'products',
	action() {

		mount(AppLayout, {
			content: <CategoriesView/>,
		});

	},
});

exposed.route('/products/:category', {
	name: 'products',
	action(params) {

		mount(AppLayout, {
			content: <ProductsView data={Products} category={params.category	} />,
		});

	},
});

exposed.route('/cart', {
	name: 'cart',
	action(params) {

		mount(AppLayout, {
			content: <Cart data={Checkout} />,
		});

	},
});

exposed.route('/checkout', {
	name: 'checkout',
	action(params) {

		mount(AppLayout, {
			content: <Payment data={Checkout} />,
		});

	},
});


exposed.route('/add', {
	name: 'add',
	action() {

		mount(AppLayout, {
			content: <ProductsAdd data={Products} />,
		});

	},
});

exposed.route('/edit/:id', {
	name: 'edit',
	action(params) {

		mount(AppLayout, {
			content: <ProductsAdd data={Products} id={params.id} />,
		});

	},
});


exposed.route('/login', {
	name: 'login',
	action() {

		mount(AppLayout, {
			content: <Login />,
		});

	},
});

exposed.route('/forgotPassword', {
	name: 'forgotPassword',
	action() {

		mount(AppLayout, {
			content: <ForgotPassword />,
		});

	},
});

exposed.route('/reset-password/:token', {
	name: 'newPassword',
	action(params) {
		// console.log(passwordResetToken);
		mount(AppLayout, {
			content: <NewPassword resetToken={params.token} />,
		});

	},
});

exposed.route('/signup', {
	name: 'signup',
	action() {

		mount(AppLayout, {
			content: <Signup />,
		});

	},
});


FlowRouter.notFound = {
	action: () => {
		mount(AppLayout, {
			content: <NotFound />,
		});

	},
};
