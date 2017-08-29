import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './StreetView.css';

import { Button } from 'reactstrap';
import ReactStreetview from 'react-streetview';
import { store_current_position, screenshot, get_last_position } from 'states/camera-actions.js';


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
			start_timer: false,
			position: null,
			pov: { heading: 100, pitch: 0 }
		};

		this.handle_screenshot = this.handle_screenshot.bind(this);
	}

	timer() {
		if (this.state.start_timer === true) {
			this.setState({
				travel_time: this.state.travel_time + 1
			});
		} else if (this.props.finish_get_last_position === true) {
			this.setState({
				travel_time: this.props.time,
				start_timer: true
			});
		}
	}

	componentDidMount() {
		const { account, lat, lng, heading, pitch, time } = this.props;
		if (account !== "") {
			this.props.dispatch(get_last_position(account, lat, lng, heading, pitch, time));
			this.inter_id = setInterval(
				() => this.timer(),
				1000
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
			clearInterval(this.inter_id);
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

		return (
			<div className='StreetView'>

				<Button className='btn-form' onClick={this.handle_screenshot}>Screen Shot!</Button>

				<h5>{reminder}</h5>

				{this.state.travel_time !== 0 && <h4>Travel Time: {this.state.travel_time} seconds</h4>}

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
