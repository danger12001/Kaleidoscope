import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
export default class Add extends Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			quantity: 0,
			category: '',
		};
		this.add = this.add.bind(this);
	}

add(){
	const {name, quantity, category} = this.state;

	Products.insert({name, quantity, category}, (err) => {
		console.log(err);
		FlowRouter.go('settings')
	});
}

	// selectCategory(category){
	//
	// 		const categories = [{name: 'pendants', id: 0}, {name: 'Coasters', id: 1}, {name: 'pyramids', id: 3}, {name: 'tables', id: 4}, {name: 'spiritual ceiling protectors', id: 5}, {name: 'custom': 6}];
	//
	// 		categories.forEach((cat){
	//
	// 			if(category === cat.name){
	//
	// 				this.setState({category: cat.id});
	//
	// 			}
	//
	// 		})
	//
	//
	//
	//
	// }


	render() {

		return (
			<div style={{height: '100vh'}}>

				<div className='page-title'>Add Product</div>
				<input placeholder='Product Name' type='text' onChange={(e) => this.setState({name: e.target.value})}/>
				<input placeholder='Quantity' type='number' onChange={(e) => this.setState({quantity: e.target.value})}/>
				<select onChange={(e) => this.setState({category: e.target.value})}>
				<option value=''>  </option>
				<option value='pendants'>Pendants</option>
				<option value='coasters'>Coasters</option>
				<option value='pyramids'>Pyramids</option>
				<option value='tables'>Tables</option>
				<option value='spiritual ceiling protectors'>Spiritual Ceiling Protectors</option>
				<option value='custom'>Custom Orders</option>
				</select>
				<button onClick={() => this.add()}> Add </button>
			</div>
		);

	}

}
