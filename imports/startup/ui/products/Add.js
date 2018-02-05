import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'

import { createContainer } from 'meteor/react-meteor-data';

export class Add extends Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			quantity: 0,
			category: '',
			image_url: '',
			validEntry: false,
			uploadProgress: 0,
		};

		this.add = this.add.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.update = this.update.bind(this);
		this.checkValidation = this.checkValidation.bind(this);
		this.edit = this.edit.bind(this);
	}

add(){
	const {name, quantity, category, image_url, public_id} = this.state;

	Products.insert({name, quantity, category, image_url, public_id}, (err) => {
		console.log(err);
		FlowRouter.go('settings')
	});
}

	edit(){

		const { product } = this.props;
			const {name, quantity, category, image_url, public_id} = this.state;
			const newData = {name, quantity, category, image_url, public_id};
		Products.update({
			_id: product._id
		},{$set: newData}, (err,res) => {
			console.log(err, res)
			FlowRouter.go('settings');
		})



	}


	componentDidMount(){
		const { product } = this.props;

		if (product) {

			this.setState({name: product.name, category: product.category, quantity: product.quantity, image_url: product.image_url, public_id: product.public_id, validEntry: true });

		}


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
	uploadFile(file, callback){
		const { product } = this.props;

		if(product){
			Cloudinary.delete(product.public_id, (err, res) => {
				console.log(err)
			})
		}

		Cloudinary.upload(file[0], (err, res) => {

			if(err){
				console.log(err);
			}

			this.setState({image_url: res.url, public_id: res.public_id});
			this.checkValidation()
			console.log('upload Complete', res)

		})
	}


	checkValidation(){
		const { name, category, image_url} = this.state;
		const {product} = this.props;


		if(name !== '' && category !== '' && image_url !== ''){
			this.setState({validEntry: true})
		} else {
			this.setState({validEntry: false})
		}

	}

	update(label, data){

		const { name, quantity, category, image_url } = this.state;

		switch(label){
			case 'name':
			this.setState({name: data});
			this.checkValidation();
			break;
			case 'quantity':
			this.setState({quantity: data});
			this.checkValidation();
			break;
			case 'category':
			this.setState({category: data});
			this.checkValidation();
			break;
			default:
			this.checkValidation();
		}

	}

	render() {
		const { validEntry, image_url, uploadProgress, name, category, quantity} = this.state;
		const { product } = this.props;


		return (
			<div style={{height: '100vh'}}>

				<div className='page-title'>Add Product</div>
				<input value={name} placeholder='Product Name' type='text' onChange={(e) => this.update('name', e.target.value)}/>
				<input value={quantity} placeholder='Quantity' type='number' onChange={(e) => this.update('quantity', e.target.value)}/>
				<select value={category} onChange={(e) => this.update('category', e.target.value)}>
				<option value=''>  </option>
				<option value='pendants'>Pendants</option>
				<option value='coasters'>Coasters</option>
				<option value='pyramids'>Pyramids</option>
				<option value='tables'>Tables</option>
				<option value='spiritual ceiling protectors'>Spiritual Ceiling Protectors</option>
				<option value='custom'>Custom Orders</option>
				</select>

				<div> Product Image </div>
				<input type='file' onChange={(e) => {this.uploadFile(e.target.files, (progress) => {
					// console.log(progress)
				})}}/>

				{

					image_url !== '' ? <img style={{height: '50px', width: '50px'}} src={image_url}/> : null

				}

				{
					product ? (
						validEntry ?
						<button onClick={() => this.edit()}> Edit </button>
						: null
					) : (

					validEntry ?
					<button onClick={() => this.add()}> Add </button>
					: null
				)
				}
			</div>
		);

	}

}
export default createContainer((props) => {
	const productsHandle = Meteor.subscribe('products');
	let id = ''
	console.log(props)
	if(props.id){
		id = props.id;
	}
	return {
		productsReady: productsHandle.ready(),
    product: props.data.findOne({_id: id}),
  };
}, Add);
