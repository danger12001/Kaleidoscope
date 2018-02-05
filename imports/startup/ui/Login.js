import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
export default class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};
		this.login = this.login.bind(this);

	}

	login(){
		const {email, password} = this.state;
		Meteor.loginWithPassword(email, password, (err) => {
			if(err){
			if(err.error){
				sweetAlert(err.reason)
			}
		}
		})

	}

	render() {

		return (
			<div  style={{height: '100vh'}}>

				<div className='page-title'>Login</div>
				<input placeholder='Email' type='text' onChange={(e) => this.setState({email: e.target.value})}/>
				<input placeholder='password' type='password' onChange={(e) => this.setState({password: e.target.value})}/>
				<button onClick={this.login}> LOGIN </button>

				<div onClick={() => FlowRouter.go('/forgotPassword')}> forgot password? </div>
			</div>
		);

	}

}
