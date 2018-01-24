import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class Settings extends Component {

	constructor(props) {

		super(props);

		this.state = {
		};
		this.goToEdit = this.goToEdit.bind(this);
		this.goToAdd = this.goToAdd.bind(this);
		this.remove = this.remove.bind(this);
	}

	goToEdit(){

	}

	goToAdd(){
		FlowRouter.go('add')
	}

	remove(){

	}

	add(){




	}

	render() {
		const {productsReady, products} = this.props
		if(!productsReady){
			return  (<div style={{height: '100vh'}}> <div className='page-title'> Loading... </div> </div>)
		}
		return (
			<div >
					<div className='page-title'>Welcome Matthew :)</div>
					<div className='page-title'>Here you can add, edit and remove stuff!</div>
				<div className='card-container'>

			<div className='page-title'>Products</div>
			<div onClick={() => this.goToAdd()}>Add +</div>
			{
				products.length > 0 ?
				products.map((product, index) =>
				{


						return (
							<div className='card' key={index}>
								<div className='card-title'>{product.name}</div>
								<div className='card-label'>Amount Left:</div>	<div>+</div><div className='card-value'>{product.quantity}</div>		<div>-</div>

								<div> Edit </div>
								<div> Remove </div>
							</div>
						)


				})
				:
					<div>No products</div>

			}
				</div>
				</div>
		);

	}

}
export default createContainer((props) => {
	const productsHandle = Meteor.subscribe('products');
	return {
		productsReady: productsHandle.ready(),
    products: props.data.products.find({}).fetch(),
  };
}, Settings);
