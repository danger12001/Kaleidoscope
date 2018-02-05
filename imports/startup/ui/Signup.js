import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
export default class Signup extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			cell: '',
			first: '',
			last: '',
			validEntry: false,
		};
		this.signup = this.signup.bind(this);
		this.update = this.update.bind(this);
		this.checkValidation = this.checkValidation.bind(this);

	}


	signup(){

	const {email, password, cell, first, last, validEntry} = this.state;

	if(validEntry) {


		Accounts.createUser({email: email, password: password, profile: { admin: false, firstName: first, lastName: last, cell }}, (error,response) => {
			Checkout.insert({userId: Meteor.userId(), cart: []});
			FlowRouter.go('/')
		})

	} else {
			sweetAlert('Please ensure that all fields are completed!')
	}


	}

	checkValidation(){
		const {email, password, cell, first, last} = this.state;

		if(first !== '' && last !== '' && cell !== '' && email !== '' && password !== ''){
			this.setState({validEntry: true})
		} else {
			this.setState({validEntry: false})
		}

	}

	update(label, data){

		const { first, email, password, last, cell } = this.state;

		switch(label){
			case 'first':
			this.setState({first: data});
			this.checkValidation();
			break;
			case 'last':
			this.setState({last: data});
			this.checkValidation();
			break;
			case 'password':
			this.setState({password: data});
			this.checkValidation();
			break;
			case 'cell':
			this.setState({cell: data});
			this.checkValidation();
			break;
			case 'email':
			this.setState({email: data});
			this.checkValidation();
			break;
			default:
			this.checkValidation();
		}

	}

	render() {

		return (
			<div  style={{height: '100vh'}}>

				<div className='page-title'>Signup</div>
				<input placeholder='First Name' type='text' onChange={(e) => this.update('first',e.target.value)}/>
				<input placeholder='Last Name' type='text' onChange={(e) => this.update('last',e.target.value)}/>
				<input placeholder='CellPhone Number' type='text' onChange={(e) => this.update('cell',e.target.value)}/>
				<input placeholder='Email' type='text' onChange={(e) => this.update('email',e.target.value)}/>
				<input placeholder='password' type='password' onChange={(e) => this.update('password', e.target.value)}/>
				<button onClick={this.signup}> Signup </button>
			</div>
		);

	}

}
