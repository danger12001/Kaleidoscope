import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class ProductsView extends Component {

	constructor(props) {

		super(props);
		// console.log(props)
		this.state = {
		};

		this.addToCart = this.addToCart.bind(this);
	}

	addToCart(product){
		// console.log(product, this.props.cart)
		// const newProduct = {...product, quantity: }

		const cart = [...this.props.cart];


		let Index = null;
		const cartProduct = cart.find((item, index) => {
			Index = index;
			return item._id = product._id;
		});



		if(cartProduct !== undefined){

			if(cartProduct.quantity + 1 <= product.quantity){
				const newProduct = {...cartProduct, quantity: Number(cartProduct.quantity) + 1};
				cart[Index] = newProduct;
				Checkout.update({_id: this.props.cartId}, {$set: {cart}})
				sweetAlert(product.name + ' was added to cart!')
			} else {
				sweetAlert('There are not enough of ' + product.name + ' to add more to your cart!')
			}

		} else {
			const newProduct = {...product, quantity: 1};
			cart.push(newProduct);
			Checkout.update({_id: this.props.cartId}, {$set: {cart}})
			sweetAlert(product.name + ' was added to cart!')
		}


	}

	componentDidMount(){

	}

	render() {
		const {productsReady, products} = this.props
		if(!productsReady){
			return (<div style={{height: '100vh'}}> <div className='page-title'> Loading... </div> </div>)
		}
		return (
			<div style={{height: '100vh'}}>
					<div className='page-title'>Products Available For Sale!</div>
				<div className='card-container'>
			{
				products.length > 0 ?
				products.map((product, index) =>
				{

					if(product.quantity > 0){

						return (
							<div className='card' key={index}>
								<div className='card-title'>{product.name}</div>
								<div className='card-label'>Amount Left:</div><div className='card-value'>{product.quantity}</div>
								<img style={{height: '50px', width: '50px'}} src={product.image_url}/>
								{
									Meteor.userId() ?
									<div onClick={() => this.addToCart(product)}> Add To Cart </div>
									: null
								}
							</div>
						)

					}

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
	const checkoutHandle = Meteor.subscribe('checkout');

	return {
		productsReady: productsHandle.ready(),
		cart: Checkout.findOne({userId: Meteor.userId()}).cart,
		cartId: Checkout.findOne({userId: Meteor.userId()})._id,
    products: props.data.find({category: props.category}).fetch(),
  };
}, ProductsView);
