import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './StreetView.css';

import Button from 'material-ui/Button';
import ReactStreetview from 'react-streetview';
import { store_current_position, screenshot, get_last_position } from 'states/camera-actions.js';
import { find_friends_around_you } from 'states/chat-actions.js';
import Grid from 'material-ui/Grid';
import CameraIcon from 'material-ui-icons/CameraAlt';

class StreetView extends React.Component {
	static propTypes = {
		lat: PropTypes.number,
		lng: PropTypes.number,
		heading: PropTypes.number,
		pitch: PropTypes.number,
		time: PropTypes.number,
		reminder: PropTypes.string,
		finish_get_last_position: PropTypes.bool,
		account: PropTypes.string,
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.state = {
			travel_time: 0,
			position: null,
			pov: { heading: 100, pitch: 0 }
		};

		this.handle_screenshot = this.handle_screenshot.bind(this);
	}

	timer() {
		this.setState({
			travel_time: this.state.travel_time + 1
		});
	}

	wait_get_last_position() {
		if (this.props.finish_get_last_position === true) {
			this.setState({
				travel_time: this.props.time
			});
			this.timer_id = setInterval(
				() => this.timer(),
				60000
			);
			this.find_friends_id = setInterval(
				() => this.find_friends(),
				1000
			);
			clearInterval(this.wait_get_last_position_id);
		}
	}

	find_friends() {
		const { account } = this.props;
		this.props.dispatch(find_friends_around_you(account));
	}

	componentDidMount() {
		const { account, lat, lng, heading, pitch, time } = this.props;
		if (account !== "") {
			this.props.dispatch(get_last_position(account, lat, lng, heading, pitch, time));
			this.wait_get_last_position_id = setInterval(
				() => this.wait_get_last_position(),
				500
			);
		}
	}

	componentWillUpdate(nextProps, nextState) {
		const { account } = this.props;
		if (account !== "") {
			if (this.state.position !== null && nextState.position !== this.state.position) {

				var position_str = JSON.stringify(this.state.position);
				var position_res = position_str.replace(/\"/g, "").replace("{", "").replace("}", "").replace("lat:", "").replace("lng:", "").split(",");

				var lat = Number(position_res[0]);
				var lng = Number(position_res[1]);

				var heading = Number(this.state.pov.heading);
				var pitch = Number(this.state.pov.pitch);

				this.props.dispatch(store_current_position(account, lat, lng, heading, pitch, this.state.travel_time));
			}
		}
	}

	componentWillUnmount() {
		const { account } = this.props;
		if (account !== "") {

			var position_str = JSON.stringify(this.state.position);
			var position_res = position_str.replace(/\"/g, "").replace("{", "").replace("}", "").replace("lat:", "").replace("lng:", "").split(",");

			var lat = Number(position_res[0]);
			var lng = Number(position_res[1]);

			var heading = Number(this.state.pov.heading);
			var pitch = Number(this.state.pov.pitch);

			this.props.dispatch(store_current_position(account, lat, lng, heading, pitch, this.state.travel_time));
			clearInterval(this.timer_id);
			clearInterval(this.find_friends_id);
		}
	}

	render() {

		const { lat, lng, heading, pitch, reminder, finish_get_last_position } = this.props;
		const google_key = 'AIzaSyB2qGLOwrR1n-FrGskEn47AU1X6Nban0S4';

		var streetViewPanoramaOptions = {
			position: { lat: lat, lng: lng },
			pov: { heading: heading, pitch: pitch },
			zoom: 1,
			disableDefaultUI: true,
			disableDoubleClickZoom: true
		};

		// console.log("finish_get_last_position : " + finish_get_last_position);
		// console.log("lat: " + lat + ", lng: " + lng +", heading: " + heading + ", pitch: " + pitch + ", reminder: " + reminder);

		return (
			<div className='StreetView'>
				<Button fab color="accent" className='camera_icon' onClick={this.handle_screenshot}>
					<CameraIcon />
				</Button>

				{finish_get_last_position === true &&
					<ReactStreetview
						apiKey={google_key}
						streetViewPanoramaOptions={streetViewPanoramaOptions}
						onPositionChanged={position => this.setState({ position: position })}
						onPovChanged={pov => this.setState({ pov: pov })}
					/>
				}

			</div>

		);
	}

	handle_screenshot() {
		const { account } = this.props;
		if (account !== "" && this.state.position !== null && this.state.pov !== null) {

			var position_str = JSON.stringify(this.state.position);
			var position_res = position_str.replace(/\"/g, "").replace("{", "").replace("}", "").replace("lat:", "").replace("lng:", "").split(",");

			var lat = Number(position_res[0]);
			var lng = Number(position_res[1]);
			var heading = Number(this.state.pov.heading);
			var pitch = Number(this.state.pov.pitch);

			this.props.dispatch(screenshot(account, lat, lng, heading, pitch));
		}
	}

}

export default connect(state => ({
	...state.camera,
	...state.account
}))(StreetView);
