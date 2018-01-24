import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class CategoriesView extends Component {

	constructor(props) {

		super(props);

		this.state = {
		};


	}

	componentDidMount(){

	}

	clickItem(action) {

		if (typeof action === 'function') {

			action();

		} else {

			FlowRouter.go('products', {category: action.category});

		}

	}

	render() {

		return (
			<div style={{height: '100vh'}}>
					<div className='page-title'>Products Available For Sale!</div>
				<div className='card-container'>

							<div className='card' onClick={() => this.clickItem({category: 'pendants'})}>
								<div className='card-title'>Pendants</div>

							</div>

							<div className='card' onClick={() => this.clickItem({category: 'coasters'})}>
								<div className='card-title'>Coasters</div>

							</div>

							<div className='card' onClick={() => this.clickItem({category: 'pyramids'})}>
								<div className='card-title'>Pyramids</div>

							</div>

							<div className='card' onClick={() => this.clickItem({category: 'tables'})}>
								<div className='card-title'>Tables</div>

							</div>

							<div className='card' onClick={() => this.clickItem({category: 'spiritual ceiling protectors'})}>
								<div className='card-title'>Spiritual Ceiling Protectors</div>

							</div>

							<div className='card' onClick={() => this.clickItem({category: 'custom'})}>
								<div className='card-title'>Custom Orders</div>

							</div>

				</div>
				</div>
		);

	}

}
export default createContainer((props) => {
	// const productsHandle = Meteor.subscribe('products');
	return {
		// productsReady: productsHandle.ready(),
    // products: props.data.find({}).fetch(),
  };
}, CategoriesView);
