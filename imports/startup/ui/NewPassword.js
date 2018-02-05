import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export class NewPassword extends Component {

	constructor(props) {
		super(props);

		this.state = {
			password: '',
		};
		this.updatePassword = this.updatePassword.bind(this);

	}

	updatePassword(){
		const { password } = this.state;
		const { token } = this.props;

			Accounts.resetPassword(token ,password, (err, res) => {
				console.log(err, res)
				FlowRouter.go('/');
			})



	}

	render() {

		return (
			<div  style={{height: '100vh'}}>

				<div className='page-title'>Login</div>
				<input placeholder='New Password' type='password' onChange={(e) => this.setState({password: e.target.value})}/>

				<button onClick={this.updatePassword}> Update Password! </button>

			</div>
		);

	}

}

export default createContainer((props) => {

	return {
		token: props.resetToken,
  };
}, NewPassword);
