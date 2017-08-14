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


class StreetView extends React.Component {
	static propTypes = {
		lat: PropTypes.number, //緯度
		lng: PropTypes.number, //經度
		heading: PropTypes.number, //旋轉
		fov: PropTypes.number, //視野
		pitch: PropTypes.number, //上下
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.rotate_right = this.rotate_right.bind(this);
		this.rotate_left = this.rotate_left.bind(this);
		this.change_lens_wide = this.change_lens_wide.bind(this);
		this.change_lens_narrow = this.change_lens_narrow.bind(this);
		this.change_height_more = this.change_height_more.bind(this);
		this.change_height_less = this.change_height_less.bind(this);

	}

	render() {

		const { lat, lng, heading, fov, pitch } = this.props;
		const google_key = 'AIzaSyB2qGLOwrR1n-FrGskEn47AU1X6Nban0S4';
		const base_url = `https://maps.googleapis.com/maps/api/streetview?size=337x225`;
		var Url = `${base_url}&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&key=${google_key}`;

		return (
			<div className='StreetView'>
				<Button className='btn-form' onClick={this.rotate_right}>Rotate Right!</Button>
				<Button className='btn-form' onClick={this.rotate_left}>Rotate Left!</Button>
				<Button className='btn-form' onClick={this.change_lens_wide}>Wide!</Button>
				<Button className='btn-form' onClick={this.change_lens_narrow}>Narrow!</Button>
				<Button className='btn-form' onClick={this.change_height_more}>Tall!</Button>
				<Button className='btn-form' onClick={this.change_height_less}>Short!</Button>
				<img src={Url} class="img-fluid"></img>
			</div>

		);
	}

	rotate_right() {
		this.props.dispatch(rotate_right());
	}

	rotate_left() {
		this.props.dispatch(rotate_left());
	}

	change_lens_wide() {
		this.props.dispatch(change_lens_wide());
	}

	change_lens_narrow() {
		this.props.dispatch(change_lens_narrow());
	}

	change_height_more() {
		this.props.dispatch(change_height_more());
	}

	change_height_less() {
		this.props.dispatch(change_height_less());
	}

}

export default connect(state => state.camera)(StreetView);