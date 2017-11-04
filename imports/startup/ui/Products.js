import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class ProductsView extends Component {

	constructor(props) {

		super(props);

		this.state = {
		};


	}

componentDidMount(){
}

	render() {
		const {productsReady, products} = this.props
		if(!productsReady){
			return (<div> Loading... </div>)
		}
		return (
			<div>
					<div className='page-title'>Products Available For Sale!</div>
				<div className='card-container'>
			{
				products.length > 0 ?
				products.map((product, index) =>
				{

				 return	product.products.map((item, index) => {
						return (
							<div className='card' key={index}>
								<div className='card-title'>{item.name}</div>
								<div className='card-label'>Amount Left:</div><div className='card-value'>{item.quantity}</div>
							</div>
						)
					})

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
    products: props.data.find({}).fetch(),
  };
}, ProductsView);
