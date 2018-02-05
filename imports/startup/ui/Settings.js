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
		this.increment = this.increment.bind(this);
		this.deincrement = this.deincrement.bind(this);
	}

	goToEdit(id){
		FlowRouter.go('edit', {id})
	}

	goToAdd(){
		FlowRouter.go('add')
	}

	increment(product){
		var quantity = Number(product.quantity) + 1;

		Products.update({
			_id: product._id
		},{$set: {quantity}}, (err,res) => {

		})



	}
	deincrement(product) {

		var quantity = Number(product.quantity);
		
		if(quantity - 1 >= 0){
			quantity = quantity - 1;
		}

		Products.update({
			_id: product._id
		},{$set: {quantity}}, (err,res) => {

		})

	}


	remove(id, image_id){

		Products.remove({_id: id}, (res) => {
			Cloudinary.delete(image_id, (err, response) => {
				console.log(response)
			})
		})

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
								<div className='card-label'>Amount Left:</div>	<div onClick={() => this.increment(product)}>+</div><div className='card-value'>{product.quantity}</div>		<div onClick={() => this.deincrement(product)}>-</div>
								<img style={{height: '50px', width: '50px'}} src={product.image_url}/>
								<div onClick={() => this.goToEdit(product._id)}> Edit </div>
								<div onClick={() => this.remove(product._id, product.public_id)}> Remove </div>
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
