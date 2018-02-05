import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class Payment extends Component {

	constructor(props) {

		super(props);
		// console.log(props)
		this.state = {
		};


	}

	componentDidMount(){

	}


	render() {
		const {cartReady, cart} = this.props
		if(!cartReady){
			return (<div style={{height: '100vh'}}> <div className='page-title'> Loading... </div> </div>)
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
							<div className='card-label'>Amount:</div>	<div className='card-value'>{product.quantity}</div>
								<img style={{height: '50px', width: '50px'}} src={product.image_url}/>
							</div>
						)

					}

				})
				:
					<div>No products</div>

			}

					<div>

						<div> Postage Form </div>
						<div> Banking Details </div>

						<div> Once you have made a payment please press submit to ensure that your items are shipped to you. </div>

			 		</div>
				</div>


				</div>
		);

	}

}
export default createContainer((props) => {
	const checkoutHandle = Meteor.subscribe('checkout');
	const userId = Meteor.userId();

	return {
		cartReady: checkoutHandle.ready(),
    cart: props.data.findOne({userId}).cart,
		cartId: props.data.findOne({userId})._id,
	};
}, Payment);
