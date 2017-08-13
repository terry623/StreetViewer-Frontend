import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactStreetview from 'react-streetview';

import './StreetView.css';

class StreetView extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	render() {

		const googleMapsApiKey = 'AIzaSyD5z_2VQbK8dfKN7YXUHpcspldn7iActX4';

		// see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions 
		const streetViewPanoramaOptions = {
			position: { lat: 46.9171876, lng: 17.8951832 },
			pov: { heading: 100, pitch: 0 },
			zoom: 0.5
		};

		return (
			<div className='StreetView'>
					<ReactStreetview
						apiKey={googleMapsApiKey}
						streetViewPanoramaOptions={streetViewPanoramaOptions}
					/>
			</div>

		);
	}
}

export default connect(state => ({

}))(StreetView);