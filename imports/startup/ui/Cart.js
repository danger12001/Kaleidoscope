import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class Cart extends Component {

	constructor(props) {

		super(props);
		// console.log(props)
		this.state = {
		};

		this.deincrement = this.deincrement.bind(this);

	}

	componentDidMount(){

	}

	deincrement(product) {
		const cart = [...this.props.cart];
		let Index = null;
		const cartProduct = cart.find((item, index) => {
			Index = index;
			return item._id = product._id;
		});

		if(cartProduct !== undefined && cartProduct.quantity > 1){
			const newProduct = {...cartProduct, quantity: Number(cartProduct.quantity) - 1};
			cart[Index] = newProduct;
		} else if(cartProduct.quantity <= 1){
			console.log('remove the item now...');
			cart.splice(Index, 1);
		}
		Checkout.update({_id: this.props.cartId}, {$set: {cart}})

	}

	render() {
		const {cartReady, checkout} = this.props
		let cart = [];
		if(!cartReady){
			return (<div style={{height: '100vh'}}> <div className='page-title'> Loading... </div> </div>)
		}
		 else {
			cart = checkout.cart;
		}
		console.log(cart)
		return (
			<div style={{height: '100vh'}}>
					<div className='page-title'>Products In Cart!</div>
				<div className='card-container'>
			{
				cart &&
				cart.length > 0 ?
				cart.map((product, index) =>
				{

					if(product.quantity > 0){

						return (
							<div className='card' key={index}>
								<div className='card-title'>{product.name}</div>
							<div className='card-label'>Amount:</div>	<div className='card-value'>{product.quantity}</div>		<div onClick={() => this.deincrement(product)}>-</div>
								<img style={{height: '50px', width: '50px'}} src={product.image_url}/>
							</div>
						)

					}

				})
				:
					<div>No products</div>

			}
				</div>
				<div onClick={() => FlowRouter.go('/checkout')}> Go To Checkout! </div>
				</div>
		);

	}

}
export default createContainer((props) => {
	const checkoutHandle = Meteor.subscribe('checkout');
	const userId = Meteor.userId();

	return {
		cartReady: checkoutHandle.ready(),
    checkout: props.data.findOne({userId}),
		cartId: props.data.findOne({userId})._id,
	};
}, Cart);
