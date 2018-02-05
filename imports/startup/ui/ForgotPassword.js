import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
export default class ForgotPassword extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
		};
		this.forgotPassword = this.forgotPassword.bind(this);

	}

	forgotPassword(){
		const { email } = this.state;

		var user = Meteor.users.findOne({'emails.address':email});

		if(user){

			Accounts.forgotPassword({email}, () => {
				FlowRouter.go('/login');
			})

		} else {

			sweetAlert('This user does not exist!');

		}

	}

	render() {

		return (
			<div  style={{height: '100vh'}}>

				<div className='page-title'>Login</div>
				<input placeholder='Email' type='text' onChange={(e) => this.setState({email: e.target.value})}/>

				<button onClick={this.forgotPassword}> Request New Password </button>

			</div>
		);

	}

}
