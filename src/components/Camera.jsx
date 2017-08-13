import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StreetView from 'components/StreetView.jsx';

import './Camera.css';

class Camera extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className='Camera'>
				<StreetView />
			</div>

		);
	}
}

export default connect(state => ({

}))(Camera);