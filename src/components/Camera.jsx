import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StreetView from 'components/StreetView.jsx';
import Chat from 'components/Chat.jsx';

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
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<Chat />
			</div>

		);
	}
}

export default connect(state => ({

}))(Camera);