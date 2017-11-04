import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';
import '../../collections';


import AppLayout from '../ui/AppLayout';
import Home from '../ui/Home';
import About from '../ui/About';
import NotFound from '../ui/NotFound';
import ProductsView from '../ui/Products';
import Settings from '../ui/Settings';
import Login from '../ui/Login';

Meteor.subscribe('users', function(){

	const users = Meteor.users.find({}).fetch();
		if(users && users.length === 0 ){
			Accounts.createUser({email: 'matthewjaybechus@gmail.com', password: 'Admin2017'}, (response) => {
				console.log(response)
			})
		}
})





Accounts.onLogin(() => {

	const redirect = 'settings';

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
		if(Meteor.userId()){
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
			content: <ProductsView data={Products} />,
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

FlowRouter.notFound = {
	action: () => {
		mount(AppLayout, {
			content: <NotFound />,
		});

	},
};
