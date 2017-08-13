import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactStreetview from 'react-streetview';

import './StreetView.css';
import { position } from 'states/camera-actions.js';
import { Button } from 'reactstrap';

import { GoogleMap, Marker } from "react-google-maps";

class StreetView extends React.Component {
	static propTypes = {
		lat: PropTypes.number,
		lng: PropTypes.number,
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	render() {

		const googleMapsApiKey = 'AIzaSyD5z_2VQbK8dfKN7YXUHpcspldn7iActX4';

		const { lat, lng } = this.props;

		// see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions 
		const streetViewPanoramaOptions = {
			position: {
				lat: lat,
				lng: lng
			},
			disableDefaultUI: true,
			disableDoubleClickZoom: true,
			clickToGo: false,
		};

		return (
			<div className='StreetView'>
				<ReactStreetview
					apiKey={googleMapsApiKey}
					streetViewPanoramaOptions={streetViewPanoramaOptions}
				/>
				<Button className='btn-form' onClick={this.handleClick}>Click Me!</Button>
			</div>

		);
	}

	handleClick() {
		this.props.dispatch(position(0, 0));
	}

}

export default connect(state => state.move_camera)(StreetView);