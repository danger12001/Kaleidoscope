import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class AppLayout extends Component {

	clickItem(action) {

		if (typeof action === 'function') {

			action();

		} else {

			FlowRouter.go(action);

		}

	}

	renderItem(label, action) {
		const routeName = FlowRouter.getRouteName();
		const isActive = routeName && routeName === action ? 'active' : '';
		return (
			<div className={`item ${isActive}`} onClick={() => this.clickItem(action)}>
				<div>{label}</div>
				<div />
			</div>
		);

	}

	render() {
		console.log(Meteor.userId())
		const { content, isAdmin } = this.props;

		return (
			<div>
				<div className="navBar">
					<div className="menu">
            { this.renderItem('Home', 'home') }
						{ this.renderItem('Products', 'products') }
						{ !isAdmin && this.renderItem('Login', 'login') }
						{ isAdmin && this.renderItem('Settings', 'settings') }
						{ this.renderItem('About Us', 'about') }
						{ isAdmin && this.renderItem('Log Out', Meteor.logout) }
					</div>
				</div>
				<div style={{backgroundColor: 'black'}}>
					<div className='background1'>
				{content}
					</div>
				</div>
			</div>
		);

	}

}

export default createContainer(() =>

({

	isAdmin: Meteor.userId() ? true : false,
}), AppLayout);
