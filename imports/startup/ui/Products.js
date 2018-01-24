import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class ProductsView extends Component {

	constructor(props) {

		super(props);
		console.log(props)
		this.state = {
		};


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

	return {
		productsReady: productsHandle.ready(),
    products: props.data.find({category: props.category}).fetch(),
  };
}, ProductsView);
