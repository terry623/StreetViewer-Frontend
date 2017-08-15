import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './StreetView.css';
import {
	move,
	rotate_right,
	rotate_left,
	change_lens_wide,
	change_lens_narrow,
	change_height_more,
	change_height_less
} from 'states/camera-actions.js';

import { Button } from 'reactstrap';
import ReactStreetview from 'react-streetview';
import { screenshot, store_location } from 'states/camera-actions.js';


class StreetView extends React.Component {
	static propTypes = {
		position_res: PropTypes.string,
		heading_res: PropTypes.number, //旋轉
		pitch_res: PropTypes.number, //上下
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.state = {
			position: null,
			pov: null
		};

		this.handle_screenshot = this.handle_screenshot.bind(this);
		this.handle_store_location = this.handle_store_location.bind(this);

	}

	render() {

		const { heading, pitch } = this.props;
		const google_key = 'AIzaSyB2qGLOwrR1n-FrGskEn47AU1X6Nban0S4';
		const base_url = `https://maps.googleapis.com/maps/api/streetview?size=337x225`;
		//var Url = `${base_url}&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&key=${google_key}`;
		var Url = `${base_url}&location=${this.props.position}&heading=${heading}&pitch=${pitch}&key=${google_key}`;

		var streetViewPanoramaOptions = {
			position: { lat: 24.239647, lng: 120.704232 },
			pov: { heading: heading, pitch: pitch },
			zoom: 1,
			disableDefaultUI: true,
			disableDoubleClickZoom: true
		};

		var position_str = JSON.stringify(this.state.position);
		var position_res = position_str.replace(/\"/g, "").replace("{", "").replace("}", "").replace("lat:", "").replace("lng:", "").replace(":", "");

		var pov_str = JSON.stringify(this.state.pov);
		var pov_res = pov_str.replace(/\"/g, "").replace("{", "").replace("}", "").replace("heading:", "").replace("pitch:", "").replace(":", "");
		var res = pov_res.split(",");
		var heading_res = res[0];
		var pitch_res = res[1];


		return (
			<div className='StreetView'>
				<Button className='btn-form' onClick={this.handle_screenshot}>Screen Shot!</Button>
				<Button className='btn-form' onClick={this.handle_store_location}>Store Location!</Button>

				<ReactStreetview
					apiKey={google_key}
					streetViewPanoramaOptions={streetViewPanoramaOptions}
					onPositionChanged={position => this.setState({ position: position })}
					onPovChanged={pov => this.setState({ pov: pov })}
				/>

				{/* Position: {JSON.stringify(this.state.position)}<br/>
				Pos_Res: {position_res}<br/>

				Pov: {JSON.stringify(this.state.pov)}<br/>
				Pov_Res: {pov_res}<br/>
				Heading_Res:{res[0]}<br/>
				Pitch_Res:{res[1]}<br/> */}

				{position_res}
				{heading_res}
				{pitch_res}
				<img src={Url}></img>

			</div>

		);
	}

	handle_screenshot(position_res, heading_res, pitch_res) {
		this.props.dispatch(screenshot(position_res, heading_res, pitch_res));
	}

	handle_store_location(position_res) {
		this.props.dispatch(store_location(position_res));
	}

}

export default connect(state => state.camera)(StreetView);