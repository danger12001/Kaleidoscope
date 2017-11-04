import React, { Component } from 'react';

export default class NotFound extends Component {

	render() {

		return (


				<div style={{paddingTop: '15%'}}>
					<div style={{color: 'white', width: '100%', textAlign: 'center', fontSize: 20, fontWeight: 'bold', paddingBottom: 15}}>THIS PAGE IS NOT A THING :(</div>
					<div style={{width: '100%', textAlign: 'center'}}>
						<button className="button" onClick={() => FlowRouter.go('home')}>Return Home</button>
					</div>
				</div>




		);

	}

}
